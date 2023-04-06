package flight;

import org.apache.spark.SparkConf;
import org.apache.spark.streaming.Durations;

import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import scala.Tuple2;


import java.util.Arrays;

import java.util.List;

public class Stream {
    public static void main(String[] args) throws InterruptedException {
        SparkConf conf = new SparkConf()
            .setAppName("NetworkWordCount") 
            .setMaster("local[*]");
        JavaStreamingContext jssc =
            new JavaStreamingContext(conf, Durations.seconds(1));

        JavaReceiverInputDStream<String> lines =
            jssc.socketTextStream("localhost", 9999);
            //jssc.socketTextStream("192.168.150.148", 9999);
        
      
            JavaPairDStream<String, Double> delayedFlights = lines.mapToPair(x->{
                List<String> arr = Arrays.asList(x.split(","));
                return new Tuple2<>(arr.get(2),Double.parseDouble(arr.get(7)));
            });
            delayedFlights.print();
            
        
        jssc.start();
        jssc.awaitTermination();
    }
  }
