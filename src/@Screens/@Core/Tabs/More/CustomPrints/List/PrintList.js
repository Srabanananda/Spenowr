import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Card from './Card';
const PrintList = ({dataSet,refresh}:any) => {

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    };

    const renderPages = ({item,idx}) => {
        return <Card key={idx}  printData={item} />;
    };
    
    return(
        <>
            <FlatList
                // ListFooterComponent={renderFooter()} 
                contentContainerStyle={{padding:moderateScale(10)}}
                data={dataSet?.list}
                horizontal={false}
                initialNumToRender={5}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing .."
                        titleColor={'#000'} />
                }
                removeClippedSubviews={true}
                renderItem = {renderPages} 
                showsVerticalScrollIndicator={false}
                style={{flex:1}}
                keyExtractor={item=>item.id.toString()}
                // onEndReached={()=>refresh(dataSet?.list.length,dataSet?.list.length+15)}
                onEndReachedThreshold={0.3}
            />
        </>
    );

};
export default PrintList;