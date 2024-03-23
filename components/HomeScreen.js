import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import UiColors from '../assets/colors';
import {useEffect, useState} from 'react';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/dllbn/bswtch/main/data-bswtch.json',
        );
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#01bb88" />
        <Text style={styles.LoadingText}>Fetching route data</Text>
      </View>
    );
  }

  // const handleSearchText = text => {
  //   setSearch(text);
  // };

  // const handleSearch = () => {
  //   RouteListInfo.map(value => {
  //     if (value.BusRoute.includes(search)) {
  //       console.log(true);
  //       console.log(search);
  //     } else {
  //       console.log(false);
  //     }
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.NavView}>
        <Image
          style={styles.NavLogo}
          source={require('../assets/icons/LogoType.png')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
          <Image
            style={styles.AboutLogo}
            source={require('../assets/icons/HomeMenu.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* <View style={{marginBottom: 10}}>
          <TextInput
            style={{
              backgroundColor: UiColors.secondary,
              fontSize: 18,
              fontWeight: '600',
              paddingVertical: 16,
              borderRadius: 8,
              paddingHorizontal: 15,
            }}
            onChangeText={handleSearchText}
            value={search}
            onSubmitEditing={handleSearch}
            placeholder="Search the place"></TextInput>
        </View> */}

        <Text style={styles.SectionHead}>Select your route</Text>
        <ScrollView>
          {data.map((value, key) => (
            <TouchableOpacity
              key={key}
              style={styles.RouteView}
              onPress={() =>
                navigation.navigate('DetailsPage', {
                  id: value.id,
                  name: value.SrcDes,
                  fullValue: value,
                })
              }>
              <Image
                style={styles.RouteLogo}
                source={require('../assets/icons/Routing.png')}
              />
              <View style={styles.RouteText}>
                <Text style={styles.RouteMainHead}>{value.SrcDes}</Text>
                <Text style={styles.RouteSrcDes}>{value.BusRoute}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingText: {
    fontFamily: 'HelveticaNowDisplay-Medium',
    fontSize: 18,
    color: UiColors.dark,
  },
  container: {
    flex: 1,
    backgroundColor: UiColors.primary,
    paddingHorizontal: 10,
  },
  NavView: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  NavLogo: {
    width: 155,
    height: 35,
    objectFit: 'contain',
  },
  AboutLogo: {
    width: 35,
    height: 25,
    objectFit: 'contain',
  },
  SectionHead: {
    fontFamily: 'HelveticaNowDisplay-Bold',
    color: UiColors.dark,
    fontSize: 19.5,
    marginBottom: 10,
  },
  RouteLogo: {
    width: 35,
    height: 35,
    objectFit: 'contain',
  },
  RouteText: {
    rowGap: -1,
  },
  RouteMainHead: {
    color: UiColors.dark,
    fontFamily: 'HelveticaNowDisplay-Bold',
    fontSize: 18,
  },
  RouteSrcDes: {
    color: UiColors.dark,
    fontFamily: 'HelveticaNowDisplay-Medium',
    fontSize: 15,
  },
  RouteView: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    padding: 17,
    alignItems: 'center',
    rowGap: 15,
    marginBottom: 10,
    columnGap: 15,
    borderRadius: 10,
    backgroundColor: UiColors.secondary,
  },
});
