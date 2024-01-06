/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect } from 'react';
import {ScrollView, View} from 'react-native';
import { useStore } from 'react-redux';
import Config from '@Config/default';
import HTML from 'react-native-render-html';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import MusicPlayer from '../../@Common/MusicPlayer';
const {COLOR:{APP_THEME_COLOR}} = Config;

const Content = () =>{
    const store = useStore();
    const {
        productDetails:{articleDetailsData:{article}}
    } = store.getState();
    const {article_description, polly_response_msg} = article;

    let desc = article_description.replace(/style="line-height: 1.38;/g,'');
    desc = desc.replace(/#f2184f/g,`${APP_THEME_COLOR}`);
    return(
        <ScrollView>    
            {
                polly_response_msg != null && (polly_response_msg.includes('.mp3') || polly_response_msg.includes('.mp4')) && 
                <MusicPlayer track={polly_response_msg}  />
            }
            <HTML 
                renderers = {{
                    h4: (htmlAttribs, children ,convertedCSSStyles, passProps) => {
                        const  {transientChildren = []} = passProps;
                        if(transientChildren[0] !== undefined)
                        {
                            const {children : innerChild = [{data  : ''}]} = transientChildren[0];
                            if(innerChild[0].data==undefined){
                                var {data = ''} = innerChild[0].children[0];

                                return  <>
                                    {data != "" && 
                                    <View style={{marginTop:8}}><FormHeader headerText={data} /></View>
                                    || null}
                                </>
                            }else{
                            var {data = ''} = innerChild[0];
                            return  <>
                                {data != "" && 
                                <View style={{marginTop:8}}><FormHeader headerText={data} /></View>
                                || null}
                            </>

                            }

                   
                        }
                        return null;
                    }
                }}
                source={{html : desc}}
            />
        </ScrollView>
    );
};

export default Content;