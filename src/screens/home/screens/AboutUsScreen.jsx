
import React,{useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
  
} from 'react-native';
import { colors } from '../../../components/Colors';

const data = [
    {
      id: '1',
      title: 'Guaranteed quality',
      description: 'Without high standards, we would not have achieved such results, which is why we conduct trainings to constantly improve our skills.',
      image: require('../images/settingsScreen/quality.jpg'),
    },

    {
      id: '2',
      title: 'Fast delivery',
      description: 'We understand that one of the most important criteria for our customers is delivery time',
      image: require('../images/settingsScreen/delivery.jpg'),
    },

    {
        id: '3',
        title: 'Support service',
        description: 'We are constantly analyzing and optimizing our marketing strategy to attract new customers and improve relationships with existing clients.',
        image: require('../images/settingsScreen/support.jpg'),
    },

    {
        id: '4',
        title: 'Love for what we do',
        description: 'We love what we do and believe that you should love what you do, and most importantly, do it for yourself. Of course, we can use many epithets',
        image: require('../images/settingsScreen/pizza.jpg'),
    },
    
  ];


const {width, height}= Dimensions.get('screen');


export default function AboutUsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);


  const onFlatListScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / width);
    setActiveIndex(currentIndex);
  
  };

  const renderItem = ({ item, index }) => (
    <View style={{ width: width }}>
      <TouchableOpacity style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <View style={styles.textContainer}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.text}>Hello! We -  Pizza and  Sushi - are your favorite pizza and sushi delivery in 11 cities of Ukraine, namely: Ivano-Frankivsk, Kolomyia, Chernivtsi, Khmelnytskyi, Uzhhorod, Bila Tserkva, Ternopil, Lutsk, Lviv, Kamianets-Podilskyi and Vinnytsia!
            The history of our company is really cool! We keep up with the times, constantly improving all processes, such as pizza and sushi preparation, courier delivery, and customer interaction.
    
            " Pizza and  Sushi means time to spend with your loved ones, time for warm conversations, time spent on pleasures, because you get it when you make a simple decision: call for pizza and sushi delivery!
    
            Stay with us and get the most delicious pizza, sushi, constant cool promotions, bonuses, master classes for children and adults, and many more benefits that you can quickly learn about by following us on social media!
        </Text>
        <Text style={styles.title}>Our advantages</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        extraData={activeIndex}
        onScroll={onFlatListScroll}
      />
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <Image
            key={index}
            source={
              index === activeIndex
              ? require('../images/settingsScreen/icon-send.png') 
              : require('../images/settingsScreen/icon-right-arrow.png') 
            }
            style={styles.paginationDot}
          />
        ))}
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.lightgrey
  },
  wrap:{
            
    justifyContent:'center', 
    alignItems: 'center',
    padding:20
  },
      
  title : {
    color:colors.orange,
    marginTop:20,
    fontSize:22,

  },
  text:{
    fontSize:16,
    color: colors.itemBackground,
    textAlign: 'justify',
  },
  carouselItem: {
    flexDirection:'row',
    width: 355,
    marginHorizontal: 14,
    borderRadius: 8,
    overflow: 'hidden',
    
  },
  carouselImage: {
    width: 170,
    height: 170,
  },
  description:{
    textAlign: 'justify',
    color:colors.dark
  },
  textContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:colors.title,
    textDecorationLine: 'underline',
    
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  paginationDot: {
    width: 15,
    height: 15,
    marginHorizontal: 6,
    marginBottom:15
  },
});