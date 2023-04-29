package consumer;

import org.apache.spark.SparkConf;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.*;
import org.apache.spark.streaming.kafka.KafkaUtils;

import scala.Tuple2;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import mongoClient.DelayModel;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
public class SparkKafkaConsumer {
    
    
    private SparkKafkaConsumer() {
    }

    public static void main(String[] args) throws Exception {
        final  String URI = "mongodb://root:racem@mongo:27017/";
    CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
        MongoClient mongoClient = MongoClients.create(URI);
        if (args.length < 4) {
            System.err.println("Usage: SparkKafkaWordCount <zkQuorum> <group> <topics> <numThreads>");
            System.exit(1);
        }
        
        SparkConf sparkConf = new SparkConf().setAppName("SparkKafkaConsumer");
        // Creer le contexte avec une taille de batch de 2 secondes
        JavaStreamingContext jssc = new JavaStreamingContext(sparkConf,
            new Duration(500));

        int numThreads = Integer.parseInt(args[3]);
        Map<String, Integer> topicMap = new HashMap<>();
        String[] topics = args[2].split(",");
        for (String topic: topics) {
            topicMap.put(topic, numThreads);
        }

        JavaPairReceiverInputDStream<String, String> messages =
                KafkaUtils.createStream(jssc, args[0], args[1], topicMap);

        JavaDStream<String> lines = messages.map(Tuple2::_2);
        JavaPairDStream<String, Double> delayedFlights = lines.mapToPair(x->{
            List<String> arr = Arrays.asList(x.split(","));
            Double delay = 0.0;
            if(arr.get(7).length()>0) {
                 delay = Double.parseDouble(arr.get(7));
            }
            
            if(delay >0) {
                return new Tuple2<>(x,delay);
            }
            return null;
            
        });
         delayedFlights.foreachRDD(element -> {
            if( element !=null && !element.isEmpty()){
                List<Tuple2<String, Double>> tupleList =   element.collect();
                for(Tuple2<String,Double> tuple : tupleList) {
                    if( tuple !=null && tuple._1() != null  && tuple._2()!=null) {
                        String key = tuple._1();
                        Double value = tuple._2();
                        
                        MongoDatabase database = mongoClient.getDatabase("airline").withCodecRegistry(pojoCodecRegistry);
    
                MongoCollection<DelayModel> collection = database.getCollection("delay",DelayModel.class);
                        List<String> arr = Arrays.asList(key.split(","));
                        DelayModel delay = new DelayModel(arr.get(0),arr.get(2) , arr.get(3), arr.get(4),value);
                        collection.insertOne(delay);
                }
               
                }
               
                
            }
         });
         
        delayedFlights.print();
        jssc.start();
        jssc.awaitTermination();
    }
}

