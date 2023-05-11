
# BigData-airline-pipeline :

This project was elaborated to acquire practical skills and to explore various techniques and tools specifically designed to handle big data as part of our academic curriculum as software engineers

# Table of content :

<ol>
    <li>About</li>
    <li>Architecture</li>
    <li>Implementation</li>
    <li>Run the project</li>
    <li>Demo</li>
    <li>Thinking of a better version </li>
  </ol>
  
  
# About :

It is a big data pipeline that uses both batch and stream processing on an  Airline Delay and Cancellation dataset. You can find the dataset <a href="https://www.kaggle.com/datasets/yuanyuwendymu/airline-delay-and-cancellation-data-2009-2018" target="_blank">here</a>

# Architecture:

![Screenshot from 2023-05-08 00-18-05](https://user-images.githubusercontent.com/59982299/236707528-6b8f93f0-fd1a-4114-8805-e4bcc09bf481.png)

Here we got two types of processing :

### Batch-processing : 

Files of the dataset ( in csv format ) are added to Hadoop HDFS where a Map/Reduce job in launched to count the number of flights per day in every year

### Stream-processing : 

Using Kafka to Stream data. Spark-streaming consumes the incoming  real-time data streams then saves only flights which had a delay into MongoDB 

### Visualization : 

Instead of relying on existing visualization tools, we decided to develop our own visualization solution for our project. For that our server :
- Watches for any changes that are made to mongoDB (obviously insertions made by Spark-Streaming)
- Read Files from HDFS using webhdfs (To get Results from the Map/Reduce job)
- Pushing Results to the client (the frontend) in real time using sockets

# Implementation :

![bigdata-project-details 1](https://github.com/BenrhayemRacem/bigData-airline-pipeline/assets/59982299/61836ed4-de3b-4894-8d45-b0373eefdd42)

### The use of Containers :

The use of containers to encapsulate the application and its dependencies in a single unit. For that we used docker and we took benefit of docker networks to simplify the communication between  containers using the docker DNS resolution.
Another advantage is that we used two  hadoop clusters : one for batch-processing and the other for stream-processing.
Deploying the solution is facilitaded using containers and docker-compose.
Isolating containers with the usage of different networks to assure better security

### The use of MongoDB :

MongoDB is known as NOSQL database and can be used effectively in big data scenarios.

**Considerations**: We have to use MongoDB as a ReplicaSet instead of a standalone mongod instance for two reasons
-  Replicate data across multiple nodes, ensuring high availability and durability of data. This feature is crucial in big data environments where data reliability and resilience are essential.
-  We can't watch / listen for changes in the database in a standalone instance 

### Hadoop HDFS :

Distributing data accross multiple machines in the cluster.

### Spark Streaming :

It is a real-time data processing module in Apache Spark.

### Kafka :

Kafka is a distributed streaming platform that is designed to handle large-scale, real-time data streams.

==> All these platforms are used in big-data because they are distributed, scalable, Fault-tolerant, Flexible ...



# Run the project : 

 To run this project you need only to get **Docker** and **Ansible** installed.
 - Clone the repository :
 
 ```bash
 git clone https://github.com/BenrhayemRacem/bigData-airline-pipeline 
 ```
 - In the root folder , run this command to automatically deploy the project and launch the pipeline
 
```bash 
ansible-playbook ./playbooks/run-pipeline.playbook.yaml 
```

# Demo :

### Images

![Visualization](https://github.com/BenrhayemRacem/bigData-airline-pipeline/assets/59982299/4cc4bd48-266e-49f4-9a7e-dfb97d1467c0)

### Video

A little vido demonstrating how the pieline was launched and showing the visualization

[![Demo Video]()]([https://www.youtube.com/watch?v=mZdrY4Zo8A4](https://drive.google.com/file/d/1bRK5psWY4Jg9API4hQi0pGN2UalQ8Y_0/view?usp=share_link))


# Thinking of a better version :

 - Deploy the containers in Docker SWARM mode to assure high availability as it offers a good load-balancing
 - Trying to update dependencies to its latest version ( we can use dependabot as an example )
 - Integrating a monitoring system to keep track of the machines' health
 - Using the Logs of machines as a big-data source to train a model that can predict abnormal behavior




