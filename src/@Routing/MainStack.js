/**
 *  Created By @name Sukumar_Abhijeet
 */
import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import TermsAndConditionsScreen from '../@Screens/@Auth/TermsAndConditions';


// COMMON SCREENS
import WebViewScreen from '../@Screens/@Common/WebView';
import ProductDetailsScreen from '../@Screens/@Common/ProductDetails';
import ArtworkDetailsScreen from '../@Screens/@Common/ArtworkDetails';
import ArticleDetailScreen from '../@Screens/@Common/ArticleDetails';
import NotificationScreen from '../@Screens/@Common/Notifications';
import AddSpecializationsScreen from '../@Screens/@Auth/Onboarding/AddSpecializations';
import PaymentInitiationScreen from '../@Screens/@Common/Payments';
import AccountInfoScreen from '../@Screens/@Common/AccountInfo';
import QuotesDetailScreen from '../@Screens/@Common/QuoteDetails';
import CartScreen from '../@Screens/@Common/Cart';
import ShippingAddressScreen from '../@Screens/@Common/ShippingAddress';
import BankAccountScreen from '../@Screens/@Common/BankAccount';
import ReferalsScreen from '../@Screens/@Common/Referals';
import ShoppingCartCheckoutScreen from '../@Screens/@Common/Cart/Checkout';
import MyOrdersScreen from '../@Screens/@Common/MyOrders';
import ProductPaymentScreen from '../@Screens/@Common/Payments/ProductPaymentScreen';
import OrderDetailsScreen from '../@Screens/@Common/MyOrders/Details';
import SubscriptionScreen from '../@Screens/@Common/Subscription';
import SearchScreen from '../@Screens/@Common/Search';
import JobDetailsScreen from '../@Screens/@Common/Jobs/Details';
import AddJobScreen from '../@Screens/@Common/Jobs/AddJob';
import MyJobsScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Jobs';
import PackageScreen from '../@Screens/@Common/Service_Package';
import ServiceDetailsScreen from '../@Screens/@Common/Service_Package/ServiceDetails';
import MyWorkExperienceScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/WorkExp';


//SPENOWR TAB SCREEN
import FindArtistScreen from '../@Screens/@Core/Tabs/Spenowr/Artists';
import FindTrainersScreen from '../@Screens/@Core/Tabs/Spenowr/Trainers';
import CustomOrdersScreen from '../@Screens/@Core/Tabs/Spenowr/CustomOrders';
import TrainingClassesScreen from '../@Screens/@Core/Tabs/Spenowr/TrainingClasses';
import ViewMoreArtistScreen from '../@Screens/@Core/Tabs/Spenowr/Artists/ViewMoreArtist';


//PROFILE TAB SCREEN
import UserProjects from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Projects';
import UserProjectDetailScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Projects/ProjectDetail';
import CreateProjectScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Projects/CreateProject';
import SellerProfileScreen from '../@Screens/@Core/Tabs/Profile/SellerAccount';
import AddSellerProductScreen from '../@Screens/@Core/Tabs/Profile/SellerAccount/SellerProducts/AddProduct';
import SellerOrderDetailsScreen from '../@Screens/@Core/Tabs/Profile/SellerAccount/Orders/OrderDetails';
import ProfileInsightsScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Insights';
import ArtWorksScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Artworks';
import PortfolioScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Portfolio';
import ServicesScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Services';
import AddServiceScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Services/AddServices';
import AddArtWorkScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Artworks/AddArtWork';
import WriteupScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Writeups';
import AddWritingsScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Writeups/Writings/AddWritings';
import EditProfileScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/EditProfile';
import PublicProfileScreen from '../@Screens/@Core/Tabs/Profile/Public';
import SPointsLogScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/SPoints';
import RedeemRewardScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/ReedemReward';
import AddArticleScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Writeups/Articles/AddArticle';
import MyEarningsScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/MyEarnings';
import AddPackageScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Services/Packages/AddPackage';
import MyCreditPointScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/CreditPoints';
import ProfileVerificationScreen from '../@Screens/@Core/Tabs/Profile/Details/Verification/ProfileVerification';
import MySeriesScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Series';
import AddSeriesScreen from '../@Screens/@Core/Tabs/Profile/Details/ActionsAndActivities/Series/AddSeries';

//MORE TABS SCREEN
import SeriesScreen from '../@Screens/@Core/Tabs/Home/Tabs/Series/index';
import SeriesPlayerScreen from '../@Screens/@Core/Tabs/Home/Tabs/Series/List/Player';
import SeriesDetailsScreen from '../@Screens/@Core/Tabs/Home/Tabs/Series/List';
import DonateScreen from '../@Screens/@Core/Tabs/More/Donate';
import ProjectScreen from '../@Screens/@Core/Tabs/More/Projects';
import ProjectDetailScreen from '../@Screens/@Core/Tabs/More/Projects/ProjectDetail';
import SupportScreen from '../@Screens/@Core/Tabs/More/Support';
import ContestScreen from '../@Screens/@Core/Tabs/More/Contest';
import ContestDetailsScreen from '../@Screens/@Core/Tabs/More/Contest/ContestDetails';
import ArtworkGalleryScreen from '../@Screens/@Core/Tabs/More/Gallery';
import MessageCenterScreen from '../@Screens/@Core/Tabs/More/MessageCenter';
import UserSettingsScreen from '../@Screens/@Core/Tabs/More/Settings/UserSettings';
import AppSettingsScreen from '../@Screens/@Core/Tabs/More/Settings/AppSettings';
import ProductListScreen from '../@Screens/@Core/Tabs/Shop/ProductList';
import SubscriptionPaymentScreen from '../@Screens/@Common/Payments/Subscription';
import JobsScreen from '../@Screens/@Common/Jobs';
import AddWorkExpScreen from '../@Screens/@Common/WorkExp/AddWorkExp';
import CustomPrintScreen from '../@Screens/@Core/Tabs/More/CustomPrints';
import CustomPrintDetailsScreen from '../@Screens/@Common/CustomPrintDetails';
import PrintCustomizationScreen from '../@Screens/@Common/CustomPrintDetails/Customization';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <>
            {/* COMMON SCREENS */}
            <Stack.Screen component={TermsAndConditionsScreen} name ='screen' />
            <Stack.Screen component={CartScreen} name={'Cart'} />
            <Stack.Screen component={MyOrdersScreen} name={'MyOrders'} />
            <Stack.Screen component={OrderDetailsScreen} name={'OrderDetails'} />
            <Stack.Screen component={ShoppingCartCheckoutScreen} name={'CartCheckout'} /> 
            <Stack.Screen component={ProductPaymentScreen} name={'ProductPay'} />
            <Stack.Screen component={ShippingAddressScreen} name = {'ShippingAddress'} />
            <Stack.Screen component={BankAccountScreen} name = {'BankAccount'} />
            <Stack.Screen component={ReferalsScreen} name = {'Referals'} />
            <Stack.Screen component={WebViewScreen} name ='CommonWebView' />
            <Stack.Screen component={ProductDetailsScreen} name ='ProductDetails' />
            <Stack.Screen component={ArtworkDetailsScreen} name='ArtworkDetails' />
            <Stack.Screen component={ArticleDetailScreen} name={'ArticleDetails'} />
            <Stack.Screen component={NotificationScreen} name='Notifications' />
            <Stack.Screen component={AddSpecializationsScreen} name='Specialization' />
            <Stack.Screen component={AccountInfoScreen} name='AccountInfo' />
            <Stack.Screen component={QuotesDetailScreen} name={'QuotesDetails'} />
            <Stack.Screen component={PaymentInitiationScreen} name={'PaymentInitiation'} />
            <Stack.Screen component={SubscriptionScreen} name={'Subscription'} />
            <Stack.Screen component={SubscriptionPaymentScreen} name={'SubscriptionPayment'} />
            <Stack.Screen component={SearchScreen} name={'SearchScreen'} />
            <Stack.Screen component={JobDetailsScreen} name={'JobDetails'} />
            <Stack.Screen component={AddJobScreen} name={'AddJob'} />
            <Stack.Screen component={MyJobsScreen} name={'MyJobs'} />
            <Stack.Screen component={MyWorkExperienceScreen} name={'MyWorkExp'} />
            <Stack.Screen component={AddWorkExpScreen} name={'AddWorkExp'} />
            <Stack.Screen component={PackageScreen} name={'Package'} />
            <Stack.Screen component={ServiceDetailsScreen} name={'ServiceDetails'} />

            {/* SHOP TAB STACK */}
            <Stack.Screen component={ProductListScreen} name='ProductList' />

            {/* SPENOWR TAB STACK */}
            <Stack.Screen component={FindArtistScreen} name='FindArtist' />
            <Stack.Screen component={ViewMoreArtistScreen} name='ViewMoreArtist' />
            <Stack.Screen component={FindTrainersScreen} name='FindTrainer' />
            <Stack.Screen component={TrainingClassesScreen} name='TrainingClasses' />
            <Stack.Screen component={CustomOrdersScreen} name='CustomOrder' />

            {/* PROFILE TAB STACK */}
            <Stack.Screen component={MySeriesScreen} name ='MySeries' />
            <Stack.Screen component={AddSeriesScreen} name ='AddSeries' />
            <Stack.Screen component={SellerProfileScreen} name ='SellerProfile' />
            <Stack.Screen component={SellerOrderDetailsScreen} name ='SellerOrderDetails' />
            <Stack.Screen component={AddSellerProductScreen} name ='AddSellerProduct' />
            <Stack.Screen component={ArtWorksScreen} name ='ArtWorksScreen' />
            <Stack.Screen component={PortfolioScreen} name='PortfolioScreen' />
            <Stack.Screen component={WriteupScreen} name='WriteupScreen' />
            <Stack.Screen component={ServicesScreen} name='ServicesScreen' />
            <Stack.Screen component={ProfileInsightsScreen} name='ProfileInsights' />
            <Stack.Screen component={EditProfileScreen} name ='EditProfile' />
            <Stack.Screen component={AddServiceScreen} name ='AddServices' />
            <Stack.Screen component={AddArtWorkScreen} name ='AddArtWork' />
            <Stack.Screen component={AddWritingsScreen} name='AddWritings' />
            <Stack.Screen component={PublicProfileScreen} name='PublicProfile' />
            <Stack.Screen component={SPointsLogScreen} name='SpointLogs' />
            <Stack.Screen component={RedeemRewardScreen} name='RedeemReward' />
            <Stack.Screen component={AddArticleScreen} name ='AddArticle' />
            <Stack.Screen component={MyEarningsScreen} name={'MyEarnings'} />
            <Stack.Screen component={AddPackageScreen} name={'AddPackage'} />
            <Stack.Screen component={MyCreditPointScreen} name={'CreditPoints'} />
            <Stack.Screen component={ProfileVerificationScreen} name={'ProfileVerification'} />
            <Stack.Screen component={UserProjects} name={'UserProject'} />
            <Stack.Screen component={UserProjectDetailScreen} name={'UserProjectDetails'} />
            <Stack.Screen component={CreateProjectScreen} name={'CreateProject'} />

            {/* MORE TAB STACK */}
            <Stack.Screen component={UserSettingsScreen} name ='UserSettings' />
            <Stack.Screen component={SeriesScreen} name ='Series' />
            <Stack.Screen component={SeriesPlayerScreen} name ='SeriesPlayer' />
            <Stack.Screen component={SeriesDetailsScreen} name ='SeriesDetails' />
            <Stack.Screen component={AppSettingsScreen} name ='AppSettings' />
            <Stack.Screen component={SupportScreen} name ='Support' />
            <Stack.Screen component={ContestScreen} name ='Contest' />
            <Stack.Screen component={ContestDetailsScreen} name ='ContestDetails' />
            <Stack.Screen component={ArtworkGalleryScreen} name ='Gallery' />
            <Stack.Screen component={MessageCenterScreen} name='MessageCenter' />
            <Stack.Screen component={JobsScreen} name='Jobs' />
            <Stack.Screen component={CustomPrintScreen} name='CustomPrints' />
            <Stack.Screen component={CustomPrintDetailsScreen} name='CustomPrintsDetails' />
            <Stack.Screen component={PrintCustomizationScreen} name='PrintCustomization' />
            <Stack.Screen component={DonateScreen} name='Donate' />
            <Stack.Screen component={ProjectScreen} name='Projects' />
            <Stack.Screen component={ProjectDetailScreen} name='ProjectDetails' />
        </>
    );
};

export default MainStack;
