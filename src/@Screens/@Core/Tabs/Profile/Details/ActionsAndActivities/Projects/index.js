/**
 * Create By @name Sukumar_Abhijeet
 */

import React,{useEffect,useState} from 'react';
import { FlatList,Text,RefreshControl, SafeAreaView,View, TouchableOpacity } from 'react-native';
import { getProjectList, getUserProjectList } from '../../../../../../../@Endpoints/Core/Tabs/More';
import ScreenLoader from '../../../../../../../@GlobalComponents/ScreenLoader';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';
import { moderateScale } from 'react-native-size-matters';
import styles from './styles';
import { CardActions } from '../../../../../../@Common/Projects';
import ProjectCard from './ProjectCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { useIsFocused } from '@react-navigation/native';
import Config from '@Config/default';
const {COLOR:{WHITE},NEW_IMG_BASE} = Config;
import ScaledImage from '../../../../../../../@GlobalComponents/ScalableImage';
import FallBackUI from '../../../../../../../@GlobalComponents/FallBackUI/index';
import ErrorBoundary from 'react-native-error-boundary';

const ProjectList = ({ ...props }) =>{
    const { navigation, route: { params: { mode } } } = props;
    const [list , setList] = useState([]);
    const [loading , setLoading] = useState(true);
    const [refreshing,setRefreshing] = useState(false);
    const isFocused =  useIsFocused();

    useEffect(()=>{
        loadList();
    },[isFocused]);

    const loadList = () =>{
        if(!list.length) setLoading(true);
        getUserProjectList()
            .then(res=>{
                const {data:{projectData=[]}} = res;
                setList(projectData);
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
            });
    };

    const onRefresh = () =>{
        setRefreshing(true);
        loadList();
        setTimeout(()=>{setRefreshing(false);},500);
    };
    

    const renderPages = ({ index, item }) =>{
        const checkNavigation = () =>{
            navigation.navigate('UserProjectDetails', {projectDetails: item});
        };
        if(item?.status !== '1') return <></>;
        return (
            <ErrorBoundary FallbackComponent={FallBackUI} key={index}>
                <View style={[styles.cardBox]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={checkNavigation} style={styles.upperCard}>
                        <ScaledImage source={{ uri: NEW_IMG_BASE + item.image_path }} >
                            <Text style={item?.type == 0 ? styles.tagStyle1 : styles.tagStyle2}>
                                {item?.type == 0 ? 'Project Ongoing' : 'Hiring Now'}{/* Project One Time */}
                            </Text>
                        </ScaledImage>
                        <View style={styles.titleView}>
                            <Text numberOfLines={1} style={styles.titleText}>{'Project name : '}{(item.title)}</Text>
                            <Text numberOfLines={1} style={styles.descText}>{'Description : '}{(item.description)}</Text>
                            {
                                item.type == 1 && 
                                <>
                                    <Text numberOfLines={1} style={styles.descText}>{'Start Date : '}{(item.start_date)}</Text>
                                    <Text numberOfLines={1} style={styles.descText}>{'End Date : '}{(item.end_date)}</Text>
                                </>
                            }
                        </View>
                        <View style={styles.titleView}>
                            <CardActions projectDetails={item} refresh={loadList} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ErrorBoundary> 
        );
    };
    
    if(loading)
        return <ScreenLoader text={'Loading Project List..'} />;

    return(
        <SafeAreaView style={{flex:1}}>
            <DefaultHeader headerText={'Projects'} />
            {!loading && list.length && <FlatList
                data={list} 
                horizontal={false}
                initialNumToRender={5}
                keyExtractor={item=>item.project_id.toString()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                removeClippedSubviews={true} 
                renderItem = {renderPages}
                showsVerticalScrollIndicator={false}
                style={{flex:1,margin:moderateScale(10)}}
            /> || <Text style={GlobalStyles.noDataFound}>{'No Project Found'}</Text>}
            {
                <TouchableOpacity onPress={() => navigation.navigate('CreateProject')} style={GlobalStyles.AddButton}>
                    <Icon color={'#fff'} name={'plus'} size={20} />
                </TouchableOpacity>
                
            }
        </SafeAreaView>
    );
};

export default ProjectList;