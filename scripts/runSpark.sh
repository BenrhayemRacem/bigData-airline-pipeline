
spark-submit --class consumer.SparkKafkaConsumer --master local[2] stream-kafka-spark-1.0-SNAPSHOT-jar-with-dependencies.jar localhost:2181 test flight 1 >> out