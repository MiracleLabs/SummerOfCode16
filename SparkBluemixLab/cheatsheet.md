# Cheat Sheet | Using Spark and Watson on IBM Bluemix for Twitter Analytics

The below markdown file consists of commands, links and code snippets that will help you complete and understand Miracle Summer of Code Lab "Using Spark and Watson on IBM Bluemix for Twitter Analytics".

## Important Links

Access Twitter Apps - https://apps.twitter.com/

Access Bluemix - http://bluemix.net

## Commands

To install Spark application JAR,

```shell
%AddJar https://github.com/ibm-cds-labs/spark.samples/raw/master/dist/streaming-twitter-assembly-1.6.jar -f
```

For streaming tweets,

```shell
import org.apache.spark.streaming._demo.startTwitterStreaming(sc, Seconds(20))
```

To create a Data Frame using Spark SQL,

```shell
val (sqlContext, df) = demo.createTwitterDataFrames(sc)
```

For displaying a sample of tweets DataFrame,

```shell
val fullSet = sqlContext.sql("select * from tweets limit100000")
fullSet.show
```

To save the tweets dataset into a parquet file in Object Storage,

```shell
fullSet.repartition(1).saveAsParquetFile("swift://notebooks.spark/Tweets.parquet")
```

## Code Snippets

The following code snippets will help you in creating the final Consumer Application.

### Configure Twitter and Watson Credentials

```
val demo = com.ibm.cds.spark.samples.StreamingTwitter
//Twitter Consumer Keys and Access tokens
demo.setConfig("twitter4j.oauth.consumerKey","<Consumer-Key>")
demo.setConfig("twitter4j.oauth.consumerSecret","<Consumer-Secret>")
demo.setConfig("twitter4j.oauth.accessToken","<access-Token>")
demo.setConfig("twitter4j.oauth.accessTokenSecret","<access-Token-Secret>")
//Tone Analyzer service credentials
demo.setConfig("watson.tone.url","<URL>")
demo.setConfig("watson.tone.password","<password>")
demo.setConfig("watson.tone.username","<user-name>")
```

### Load the data from Object Storage and create a DataFrame

```
#Import SQLContext and data types
from pyspark.sql import SQLContext
from pyspark.sql.types import *

sqlContext = SQLContext(sc)
parquetFile =sqlContext.read.parquet("swift://notebooks.spark/Tweets.parquet")
print parquetFile

parquetFile.registerTempTable("tweets");
sqlContext.cacheTable("tweets")
tweets = sqlContext.sql("SELECT * FROM tweets")
print tweets.count()
tweets.cache()

```

### Create an array which holds the count for each sentiment

```
sentimentDistribution=[0] * 9
for i, sentiment in enumerate(tweets.columns[-9:]):
 sentimentDistribution[i]=sqlContext.sql("SELECT count(*) as sentCount FROM tweets where " + sentiment + " > 60")\
.collect()[0].sentCount
```

### Compute the top 10 hashtags

```
from operator import add
import re
tagsRDD = tweets.flatMap( lambda t: re.split("\s", t.text))\
.filter( lambda word: word.startswith("#") )\
.map( lambda word : (word, 1 ))\
.reduceByKey(add, 10).map(lambda (a,b):(b,a)).sortByKey(False).map(lambda (a,b):(b,a))
top10tags = tagsRDD.take(10)
```

### Pie chart for top 10 hashtags

```
%matplotlib inline
import matplotlib
import matplotlib.pyplot as plt

params = plt.gcf()
plSize = params.get_size_inches()
params.set_size_inches( (plSize[0]*2, plSize[1]*2) )

labels = [i[0] for i in top10tags]
sizes = [int(i[1]) for i in top10tags]
colors = ['yellowgreen', 'gold', 'lightskyblue', 'lightcoral', "beige", "paleturquoise", "pink", "lightyellow", "coral"]

plt.pie(sizes, labels=labels, colors=colors,autopct='%1.1f%%', shadow=True, startangle=90)

plt.axis('equal')
plt.show()
```
