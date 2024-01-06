/**
 *  Created By @name Sukumar_Abhijeet
 */
import Toast from 'react-native-simple-toast';

export const InAppNotificationService = (notification,navigation,openPublicProfile=false) =>{
    try {
        const {navigate} = navigation;
        const {
            module_type='',
            operation='',
            slug_url='',
            entity_id='',
            sender_slug_url='',
        } = notification;

        if(openPublicProfile) navigate('PublicProfile',{slug:sender_slug_url});
        else{
            const slgs = slug_url.split('/');
            switch (module_type) {
            case 'artist':
                {
                    if(operation === 'review' || operation === 'like' || operation === 'follow' || operation === 'view')
                    {
                        navigate('Profile');
                    }
                    if(operation === 'message')
                    {
                        navigate('MessageCenter',{cID:slug_url});
                    }
                }
                break;
            case 'writings':
                {
                    if(operation === 'comment' || operation === 'like') navigation.push('QuotesDetails',{quoteSlug:slug_url});
                    if(operation === 'list')  navigate('QuotesList');
                    if(operation === 'detail')  navigate('QuotesDetails',{contestID:entity_id});
                }
                break;
            case 'artwork':
                {
                    if(operation === 'comment' || operation === 'like') navigate('ArtworkDetails',{mediaId:entity_id,artworkSlug:slgs[0]});
                    if(operation === 'list')  navigate('ArtworkList');//gallery
                    if(operation === 'detail')  navigate('ArtworkDetails',{contestID:entity_id});
                    if(operation === 'view')
                    {
                        // open featured tab.
                    }
                }
                break;
            case 'article':
                {
                    if(operation === 'comment') navigate('ArticleDetails',{articleSlug:slgs[0]});
                    if(operation === 'list')  navigate('ArticleList');
                    if(operation === 'detail')  navigate('ArticleDetails',{contestID:entity_id});
                }
                break;
            case 'contest':
                {
                    if(operation === 'view') navigate('ContestDetails',{contestID:entity_id});
                    if(operation === 'winner')  navigate('ContestDetails',{contestID:entity_id,setTab:'Winners'});
                    if(operation === 'detail')  navigate('ContestDetails',{contestID:entity_id});
                }
                break;
            case 'ContestList':
                {
                    if(operation === 'list')  navigate('ContestList');
                }
                break;
            case 'product':
                {
                    if(operation === 'list') navigate('ProductList');
                    if(operation === 'detail')  navigate('ProductDetails',{productSlug:entity_id});
                    console.log("product Notification : ", notification);
                }
                break;
            case 'Jobs':
                {
                    if(operation === 'list') navigate('Jobs');
                    if(operation === 'detail')  navigate('JobsDetails',{contestID:entity_id});
                }
                break;
            case 'Projects':
                {
                    if(operation === 'list') navigate('ProjectList');
                    if(operation === 'detail')  navigate('ProjectDetails',{contestID:entity_id});
                }
                break;
            case 'register':
                {
                    navigate('Profile');
                }
                break;
            default:
                break;
            }
        }
 
    } catch (error) {
        Toast.show('Unable to Process Notification');
    }
};