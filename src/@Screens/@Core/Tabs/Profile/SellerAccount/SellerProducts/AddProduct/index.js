/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useEffect, useState } from 'react';
import {
    View, SafeAreaView, ScrollView, TextInput, Text,
    TouchableOpacity, Image, Keyboard,
    Platform
} from 'react-native';
import DefaultHeader from '../../../../../../../@GlobalComponents/DefaultHeader';

import Config from '@Config/default';
import styles from './styles';
import DefaultButton from '../../../../../../../@GlobalComponents/DefaultButton';
import { moderateScale } from 'react-native-size-matters';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-material-dropdown';

import PRODUCT_CATEGORIES from '../../../../../../../assets/JsonFiles/ProductsJson/product_category.json';
import CURRENCIES from '../../../../../../../assets/JsonFiles/ProductsJson/currency.json';
import SelectImage from '../../../../../../../@GlobalComponents/SelectImage';
import { addMyProduct, editMyProduct } from '../../../../../../../@Endpoints/Core/Tabs/MyAccount';
import { useDispatch, connect } from 'react-redux';
import * as userActions from '@Redux/actions/userActions';
import PointShowCase from '@Spoints/PointShowCase';
import { GlobalStyles } from '../../../../../../../@GlobalStyles';
import { tagValidator } from '../../../../../../../@Utils/helperFiles/helpers';
import { getProductCare } from '../../../../../../../@Endpoints/Core/Tabs/MyAccount/index';
import countryList from '@Assets/JsonFiles/country.json';
import { pickImage } from '../../../../../../../@Utils/helperFiles/ImagePicker';
import { getSubTypeList, getTypeList } from './helper';

const categoryJson = PRODUCT_CATEGORIES.product_category.map((each) => {
    const { type: { label, value } } = each;
    return { name: value, value: label };
});

const currencyJson = CURRENCIES.currency.map((each) => {
    const { label, name, currency_id } = each;
    return { name: label, value: name, currency_id: currency_id };
});

type AddProductProps = {
    userDetails: Object,
    navigation: Object,
    route: Object
}

const { COLOR: { WHITE }, NEW_IMG_BASE } = Config;
const AddSellerProductScreen = ({ ...props }: AddProductProps) => {
    const { route, navigation, userDetails } = props;
    const dispatch = useDispatch();
    const EditData = route.params || null;

    const [isLocalPickup, setIsLocalPickup] = useState(false);
    const [isCustomised, setIsCustomised] = useState(false);
    const [isProductHidden, setIsProductHidden] = useState(false);
    const [loader, setLoader] = useState(false);

    const [categoryList] = useState(categoryJson);
    const [selectedCategory, setSelectedCategory] = useState('Select A Category');
    const [mainSubcat, setMainSubCat] = useState([]);
    const [subCategoryList, setSubCatList] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('Select A Sub-Category');
    const [currencyList] = useState(currencyJson);

    const [selectedType, setSelectedType] = useState('Select A Type');
    const [selectedSubType, setSelectedSubType] = useState('Select A Sub-Type');
    const [typeList, setTypeList] = useState([]);
    const [subTypeList, setSubTypeList] = useState([]);
    const [mainType, setMainType] = useState([]);
    const [mainSubType, setMainSubType] = useState([]);

    const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0].value);

    const [primaryImg, setPrimaryImg] = useState();
    const [showImg, setShowImg] = useState();
    const [secondary1, setSecondary1] = useState(null);
    const [secondary2, setSecondary2] = useState(null);
    const [secondary3, setSecondary3] = useState(null);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [productMrp, setProductMrp] = useState('');
    const [sellingMrp, setSellingMrp] = useState('');
    const [discount, setDiscount] = useState('');
    const [spenowrFee, setSpenowrFee] = useState('');
    const [youGet, setYouGet] = useState('');
    const [availableQty, setAvaliableQty] = useState('');
    const [displayQty, setDisplayQty] = useState('');
    const [sku, setSku] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [weight, setWeight] = useState('');
    const [url, setUrl] = useState('');
    const [earned, setEarned] = useState(0);
    const [total, setTotal] = useState(0);
    const [youtubeId, setYoutubeId] = useState('');
    const [tag, setTag] = useState('');
    const [exchangeInfo, setExchangeInfo] = useState('');
    const [shippingInfo, setShippingInfo] = useState('');
    const [careInfo, setCareInfo] = useState('');
    const [shippingFee, setShippingFee] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countryList[0].value);
    const [zipCode, setZipCode] = useState('');


    const callApi = () => {
        setLoader(true);
        getProductCare()
            .then(res => {
                const { data: {
                    exchangeReturns = '',
                    shpingInfo = '',
                    careInstruction = ''
                } } = res;
                setExchangeInfo(exchangeReturns);
                setShippingInfo(shpingInfo);
                setCareInfo(careInstruction);
            })
            .catch()
            .finally(() => setLoader(false));
    };

    useEffect(() => {
        if (!EditData) {
            if (!userDetails.country) {
                Toast.show('Please set your country first');
                navigation.navigate('EditProfile', { setTab: 2 });
            }
            callApi();
        }
    }, [EditData]);

    useEffect(() => {
        dispatch(userActions.updatePointShowCase(false));
    }, []);

    useEffect(() => {
        if (earned)
            dispatch(userActions.updatePointShowCase(true));
    }, [earned]);

    useEffect(() => {
        if (EditData) {
            const {
                EditData: {
                    title, description, product_sku,
                    original_price, discount_price,
                    display_quantity, available_quantity,
                    product_depth, product_height,
                    product_weight, product_width,
                    primary_image,
                    secondary_image1,
                    secondary_image2,
                    secondary_image3,
                    category_id,
                    currency,
                    show_price,
                    hide_product_price,
                    youtube_id,
                    tag: editedTag = '',
                    shping_info = '',
                    exchange_returns = '',
                    care_instruction = '',
                    shipping_cost = '',
                    from_country = '',
                    customized_order = '0',
                    from_zipcode,
                }
            } = EditData;

            if (show_price === '1') setIsLocalPickup(true);
            if (hide_product_price === '1') setIsProductHidden(true);
            setProductName(title);
            setDescription(description);
            const selectedCat = categoryJson.find(x => x.name === category_id);
            checkSubCategory(selectedCat.value);
            const selectedCurr = currencyJson.find(x => x.currency_id === currency);
            const selectedCtry = countryList.find(x => x.country_id === from_country);
            if (selectedCurr) setSelectedCurrency(selectedCurr.value);
            if (selectedCtry) setSelectedCountry(selectedCtry.value);
            setSku(product_sku);
            setSellingMrp(discount_price);
            setProductMrp(original_price);
            setAvaliableQty(available_quantity);
            setDisplayQty(display_quantity);
            setHeight(product_height);
            setWidth(product_width);
            setWeight(product_weight);
            setDepth(product_depth);
            setPrimaryImg(primary_image);
            setSecondary1(secondary_image1);
            setSecondary2(secondary_image2);
            setSecondary3(secondary_image3);
            setYoutubeId(youtube_id);
            setTag(editedTag);
            setExchangeInfo(exchange_returns);
            setShippingInfo(shping_info);
            setCareInfo(care_instruction);
            setShippingFee(shipping_cost);
            setIsCustomised(customized_order === '1');
            setZipCode(from_zipcode);
            if (secondary_image1 === '' && secondary_image2 === '') setShowImg(false);
            else setShowImg(true);

        }
    }, [EditData]);

    useEffect(() => {
        calculateLaterFields(productMrp);
    }, [productMrp, sellingMrp]);

    useEffect(() => {
        if (sellingMrp > parseInt(productMrp)) {
            setSellingMrp(0);
            Keyboard.dismiss();
            Toast.show('Selling Price Cannot be more than Product Price', Toast.LONG);
        }
        else
            checkFeeCount();
    }, [sellingMrp]);

    useEffect(() => {
        setDisplayQty(availableQty);
    }, [availableQty]);

    useEffect(() => {
        if (mainSubcat.length) {
            const subCats = mainSubcat.map((each) => {
                const { subcatGroup: { label, value } } = each;
                return { name: value, value: label };
            });
            setSubCatList(subCats);
            setTypeList([]);
            setSubTypeList([]);
            setSelectedSubCategory('Select A Sub-Category');
            setSelectedType('Select A Type');
            setSelectedSubType('Select A Sub-Type');
            if (EditData) {
                const { EditData: { subcategory_id, type_id, sub_type_id } } = EditData;
                const selectedSubCat = subCats.find(x => x.name === subcategory_id);
                if (selectedSubCat) {
                    setSelectedSubCategory(selectedSubCat.value);
                    const mainTypeVal = mainSubcat.find((x) => x.subcatGroup.label === selectedSubCat.value);
                    if (mainTypeVal) {
                        setMainType(mainTypeVal.subcatGroup.type);
                        const _typeList = getTypeList(mainTypeVal.subcatGroup.type);
                        const _selectedType = _typeList.find(x => x.name === type_id);
                        setTypeList(_typeList);
                        setSelectedType(_selectedType?.value ?? 'Select A Type');
                        checkSubType(_selectedType?.value, sub_type_id, mainTypeVal.subcatGroup.type);
                    }
                }
            }
        }
        else {
            setSubCatList([]);
            setSelectedSubCategory('Select A Sub-Category');
        }
    }, [mainSubcat]);

    useEffect(() => {
        const cat = categoryJson.find(x => x.value === selectedCategory);
        const subcat = subCategoryList.find(x => x.value === selectedSubCategory);

        if (cat) {
            if (subcat)
                setUrl(cat.name + '-' + subcat.name + '-' + productName.replace(/\s+/g, '-').toLowerCase());
            else
                setUrl(cat.name + '-' + productName.replace(/\s+/g, '-').toLowerCase());
        }
        else setUrl('-' + productName.replace(/\s+/g, '-').toLowerCase());
    }, [selectedSubCategory, productName, selectedCategory]);

    const checkSubCategory = (selected) => {
        setSelectedCategory(selected);
        const val = PRODUCT_CATEGORIES.product_category.find((x) => x.type.label === selected);
        setMainSubCat(val.type.subcat);
    };

    const checkType = (selected) => {
        setSelectedSubCategory(selected);
        const val = mainSubcat.find((x) => x.subcatGroup.label === selected);
        setMainType(val.subcatGroup.type);
        setTypeList(getTypeList(val.subcatGroup.type));
    };

    const checkSubType = (selected, sub_type_id = null, paramMainType = null) => {
        setSelectedType(selected);
        const TYPE = paramMainType ? paramMainType : mainType;
        const val = TYPE.find((x) => x.item.label === selected);
        const _subTypeList = getSubTypeList(val?.item?.subType ?? []);
        setMainSubType(val?.item?.subType ?? []);
        setSubTypeList(_subTypeList);
        if (sub_type_id) {
            const _selectedSubType = _subTypeList.find(x => x.name === sub_type_id);
            if (_selectedSubType) setSelectedSubType(_selectedSubType.value);
        }
    };

    const validateData = () => {
        if (
            productName === '' || description === '' || selectedCategory === 'Select A Category' || sku === '' ||
            availableQty === '' || displayQty === '' || productMrp === '' || sellingMrp === '' || shippingFee === ''
        )
            Toast.show('Please fill all mandatory fields', Toast.LONG);
        else {
            if (primaryImg) startAdding();
            else Toast.show('Please select a primary image', Toast.LONG);
        }
    };

    const startAdding = () => {
        setLoader(true);
        generateFormData();
    };

    const getRestImageFormData = (body) => {
        if (secondary1 && typeof secondary1 !== 'string')
            body.append('secondary_image_one', 'data:image/jpeg;base64,' + secondary1.base64);
        else
            body.append('secondary_image_one', null);

        if (secondary2 && typeof secondary12 !== 'string')
            body.append('secondary_image_two', 'data:image/jpeg;base64,' + secondary2.base64);
        else
            body.append('secondary_image_two', null);

        if (secondary3 && typeof secondary3 !== 'string')
            body.append('secondary_image_three', 'data:image/jpeg;base64,' + secondary3.base64);
        else
            body.append('secondary_image_three', null);
    };

    const generateFormData = () => {
        const body = new FormData();

        const { country_id } = countryList.find(x => x.value === selectedCountry);
        const { currency_id } = currencyList.find(x => x.value === selectedCurrency);

        body.append('product_name', productName);
        body.append('product_desc', description);

        const cat = categoryJson.find(x => x.value === selectedCategory);
        body.append('product_category', cat.name);
        const subcat = subCategoryList.find(x => x.value === selectedSubCategory);
        body.append('product_subcategory', subcat?.name ?? '');
        const type = typeList.find(x => x.value === selectedType);
        body.append('type_id', type?.name ?? '');
        const subtype = subTypeList.find(x => x.value === selectedSubType);
        body.append('sub_type_id', subtype?.name ?? '');

        body.append('secondary_image_four', null);
        body.append('currency', currency_id);
        body.append('selling_country', country_id);
        body.append('from_country', country_id);
        body.append('from_zipcode', zipCode);
        body.append('original_price', productMrp);
        body.append('hide_product_price', isProductHidden);
        body.append('discount_price', sellingMrp);
        body.append('commission', spenowrFee);
        body.append('discount', discount);
        body.append('total_product_cost', youGet);
        body.append('available_quantity', availableQty);
        body.append('display_quantity', displayQty);
        body.append('product_sku', sku);
        body.append('product_height', height);
        body.append('product_width', width);
        body.append('product_depth', depth);
        body.append('product_weight', weight);
        body.append('slug_url', url);
        body.append('youtube_id', youtubeId);
        body.append('tag', tag);
        body.append('shping_info', shippingInfo);
        body.append('exchange_returns', exchangeInfo);
        body.append('care_instruction', careInfo);
        body.append('shipping_cost', shippingFee);
        body.append('customized_order', isCustomised);
        EditData ? editProduct(body) : addProduct(body);
    };

    const addProduct = (formData) => {
        formData.append('primary_image', 'data:image/jpeg;base64,' + primaryImg.base64);
        getRestImageFormData(formData);
        formData.append('show_price', isLocalPickup);
        addMyProduct(formData)
            .then((res) => {
                const { data: { ProductPoint: { earnedPoint = 0, totalPoint = 0 } } } = res;
                setEarned(earnedPoint);
                setTotal(totalPoint);
                setLoader(false);
                Toast.show('Product Added Successfully', Toast.LONG);
            })
            .catch(() => {
                setLoader(false);
                Toast.show('Product Adding Failed', Toast.LONG);
            });
    };

    const editProduct = (body) => {
        body.append('product_id', EditData.EditData.id);
        if (primaryImg.base64)
            body.append('primary_image', 'data:image/jpeg;base64,' + primaryImg.base64);
        else
            body.append('primary_image', null);
        getRestImageFormData(body);
        body.append('show_price', isLocalPickup ? 1 : 0);

        editMyProduct(body)
            .then(() => {
                setLoader(false);
                Toast.show('Product Updated Successfully', Toast.LONG);
                setTimeout(() => { navigation.goBack(); }, 300);
            })
            .catch(() => {
                setLoader(false);
                Toast.show('Product Editing Failed', Toast.LONG);
            });
    };

    const chooseFile = (option) => {
        pickImage((res) => {
            let response = res;
            if (Platform.OS === 'android') {
                if (res?.assets) response = res.assets[0];
            }
            if (response.didCancel) {
                Toast.show('Image Selection Cancelled', Toast.LONG);
                return;
            }
            switch (option) {
                case 0:
                    setPrimaryImg(response);
                    break;
                case 1:
                    setSecondary1(response);
                    break;
                case 2:
                    setSecondary2(response);
                    break;
                case 3:
                    setSecondary3(response);
                    break;

                default:
                    setPrimaryImg(response);
            }
        });
    };

    const calculateLaterFields = (productMrp) => {
        let diff = productMrp - sellingMrp;
        if (diff) {
            let percent = parseFloat((diff / productMrp) * 100);
            setDiscount(Math.floor(percent) + '%');
        }
        else {
            setDiscount('0 %');
        }
        checkFeeCount();
    };

    const checkFeeCount = () => {
        let feeCounted = parseFloat(8 * sellingMrp) / 100;
        setSpenowrFee(feeCounted);
        setYouGet(sellingMrp - feeCounted);
    };

    const renderAdditionalData = () => {
        return (
            <View>
                <Text style={GlobalStyles.inputHeaderName}>SHIPPABLE WITHIN
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <View style={GlobalStyles.dropDownView}>
                    <Dropdown
                        data={countryList}
                        fontSize={moderateScale(12)}
                        onChangeText={value => {
                            setSelectedCountry(value);
                            if (value !== 'India') setIsLocalPickup(true);
                        }}
                        value={selectedCountry}
                    />
                </View>
                <Text style={styles.inputHeaderName}>CURRENCY
                    <Text style={GlobalStyles.starColor}>*</Text>
                </Text>
                <View style={styles.dropDownView}>
                    <Dropdown
                        data={currencyList}
                        fontSize={12}
                        onChangeText={(value) => setSelectedCurrency(value)}
                        value={selectedCurrency}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(8), alignItems: 'center' }}>
                    <CheckBox
                        disabled={selectedCountry !== countryList[0].value}
                        onValueChange={(newValue) => {
                            setIsLocalPickup(newValue);
                        }}
                        value={isLocalPickup}
                    />
                    <Text style={{ ...styles.inputHeaderName, marginTop: 0, marginLeft: moderateScale(8) }}>LOCAL PICKUP ONLY</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(8), alignItems: 'center' }}>
                    <CheckBox
                        disabled={false}
                        onValueChange={(newValue) => {
                            setIsProductHidden(newValue);
                        }}
                        value={isProductHidden}
                    />
                    <Text style={{ ...styles.inputHeaderName, marginTop: 0, marginLeft: moderateScale(8) }}>HIDE PRODUCT PRICE</Text>
                </View>
                <Text style={styles.inputHeaderName}>Product MRP  Price
                    <Text style={styles.starColor}>*</Text>
                </Text>
                <TextInput
                    keyboardType={'decimal-pad'}
                    onChangeText={(value) => {
                        setSellingMrp(value);
                        setProductMrp(value);
                    }}
                    style={styles.textInput}
                    value={productMrp}
                />
                <Text style={styles.inputHeaderName}>Discounted / Display Price
                    <Text style={styles.starColor}>*</Text>
                </Text>
                <TextInput
                    keyboardType={'decimal-pad'}
                    onChangeText={(value) => setSellingMrp(value)}
                    style={styles.textInput}
                    value={sellingMrp}
                />
                <Text style={styles.inputHeaderName}>YOUR DISCOUNT ON PRODUCT</Text>
                <View style={[styles.textInput, styles.disabled]}>
                    <Text>{discount}</Text>
                </View>
                <Text style={styles.inputHeaderName}>Platform Fee (8% - Includes 2% payment gateway fee)</Text>
                <View style={[styles.textInput, styles.disabled]}>
                    <Text>{spenowrFee}</Text>
                </View>
                <Text style={styles.inputHeaderName}>YOU WILL GET</Text>
                <View style={[styles.textInput, styles.disabled]}>
                    <Text>{youGet}</Text>
                </View>
                <Text style={styles.inputHeaderName}>SHIPPING FEE
                    <Text style={styles.starColor}>*</Text>
                </Text>
                <TextInput
                    keyboardType={'decimal-pad'}
                    onChangeText={(value) => setShippingFee(value)}
                    style={styles.textInput}
                    value={shippingFee}
                />
                <Text style={styles.inputHeaderName}>AVAILABLE QUANTITY
                    <Text style={styles.starColor}>*</Text>
                </Text>
                <TextInput
                    keyboardType={'number-pad'}
                    onChangeText={(value) => setAvaliableQty(value)}
                    style={styles.textInput}
                    value={availableQty}
                />
                <Text style={styles.inputHeaderName}>DISPLAY QUANTITY
                    <Text style={styles.starColor}>*</Text>
                </Text>
                <TextInput
                    keyboardType={'number-pad'}
                    onChangeText={(value) => {
                        if (value <= parseInt(availableQty))
                            setDisplayQty(value);
                        else {
                            setDiscount(0);
                            Toast.show('Display Quantity cannot be more than Available Quantity', Toast.LONG);
                            Keyboard.dismiss();
                        }
                    }}
                    style={styles.textInput}
                    value={displayQty}
                />
            </View>
        );
    };

    const showMoreImageOptions = () => {
        if (showImg)
            return (
                <>
                    <Text style={styles.inputHeaderName}>SECONDARY IMAGE 1</Text>
                    {renderSelectedFile(1)}
                    <Text style={styles.inputHeaderName}>SECONDARY IMAGE 2</Text>
                    {renderSelectedFile(2)}
                </>
            );
        return null;

    };

    const renderSelectedFile = (option) => {
        if (primaryImg && option === 0)
            return (
                <TouchableOpacity onPress={() => chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: primaryImg.base64 ? 'data:image/jpeg;base64,' + primaryImg.base64 : NEW_IMG_BASE + primaryImg }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );
        if (secondary1 && option === 1)
            return (
                <TouchableOpacity onPress={() => chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: secondary1.base64 ? 'data:image/jpeg;base64,' + secondary1.base64 : NEW_IMG_BASE + secondary1 }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );
        if (secondary2 && option === 2)
            return (
                <TouchableOpacity onPress={() => chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: secondary2.base64 ? 'data:image/jpeg;base64,' + secondary2.base64 : NEW_IMG_BASE + secondary2 }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );
        if (secondary3 && option === 3)
            return (
                <TouchableOpacity onPress={() => chooseFile(option)}>
                    <Image resizeMode={'contain'} source={{ uri: secondary3.base64 ? 'data:image/jpeg;base64,' + secondary3.base64 : NEW_IMG_BASE + secondary3 }} style={styles.selectedImageStyle} />
                </TouchableOpacity>
            );

        return <SelectImage onPress={() => chooseFile(option)} />;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
            <DefaultHeader headerText={EditData ? 'Edit Your Product' : 'Add Your Product'} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: moderateScale(20) }} >
                <View style={styles.formWrapper}>
                    <Text style={styles.inputHeaderName}>PRODUCT NAME
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <TextInput
                        onChangeText={(value) => setProductName(value)}
                        placeholder={'Product Name'}
                        style={styles.textInput}
                        value={productName}
                    />
                    <Text style={styles.inputHeaderName}>PRODUCT DESCRIPTION
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(value) => setDescription(value)}
                        style={{ ...styles.textInput, height: moderateScale(100), textAlignVertical: 'top' }}
                        value={description}
                    />
                    <Text style={styles.inputHeaderName}>TAGS (No Special Characters)</Text>
                    <TextInput
                        onChangeText={(value) => {
                            const res = tagValidator(value);
                            setTag(res);
                        }}
                        placeholder={'Comma separated. Ex:- spenowr,awesome,beautiful'}
                        style={styles.textInput}
                        value={tag}
                    />
                    <Text style={styles.inputHeaderName}>CATEGORY
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={categoryList}
                            fontSize={12}
                            onChangeText={(value) => checkSubCategory(value)}
                            value={selectedCategory}
                        />
                    </View>
                    <Text style={styles.inputHeaderName}>SUB CATEGORY</Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={subCategoryList}
                            fontSize={12}
                            onChangeText={(value) => checkType(value)}
                            value={selectedSubCategory}
                        />
                    </View>

                    <Text style={styles.inputHeaderName}>TYPE</Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={typeList}
                            fontSize={12}
                            onChangeText={(value) => checkSubType(value)}
                            value={selectedType}
                        />
                    </View>

                    <Text style={styles.inputHeaderName}>SUB TYPE</Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={subTypeList}
                            fontSize={12}
                            onChangeText={(value) => setSelectedSubType(value)}
                            value={selectedSubType}
                        />
                    </View>

                    <Text style={styles.inputHeaderName}>COUNTRY
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <View style={styles.dropDownView}>
                        <Dropdown
                            data={countryList}
                            fontSize={12}
                            onChangeText={(value) => setSelectedCountry(value)}
                            value={selectedCountry}
                        />
                    </View>

                    <Text style={styles.inputHeaderName}>Zipcode</Text>
                    <TextInput
                        keyboardType={'number-pad'}
                        onChangeText={(value) => setZipCode(value)}
                        placeholder={'Zipcode'}
                        style={styles.textInput}
                        value={zipCode}
                    />

                    <Text style={styles.inputHeaderName}>PRIMARY IMAGE
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    {renderSelectedFile(0)}
                    {
                        (!showImg) &&
                        <TouchableOpacity onPress={() => setShowImg(true)}>
                            <Text style={styles.addMore}>Add More Images</Text>
                        </TouchableOpacity>
                    }
                    {showMoreImageOptions()}
                    <Text style={GlobalStyles.inputHeaderName}>YOUTUBE : ONLY VIDEO ID </Text>
                    <TextInput
                        onChangeText={(value) => setYoutubeId(value)}
                        placeholder={'Ex : JLHJZ8ziTWk'}
                        style={GlobalStyles.textInput}
                        value={youtubeId}
                    />
                    {renderAdditionalData()}
                    <Text style={styles.inputHeaderName}>PRODUCT SKU
                        <Text style={styles.starColor}>*</Text>
                    </Text>
                    <TextInput
                        onChangeText={(value) => setSku(value)}
                        style={styles.textInput}
                        value={sku}
                    />
                    <Text style={styles.inputHeaderName}>HEIGHT(CENTIMETERS)</Text>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        onChangeText={(value) => setHeight(value)}
                        style={styles.textInput}
                        value={height}
                    />
                    <Text style={styles.inputHeaderName}>WIDTH(CENTIMETERS)</Text>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        onChangeText={(value) => setWidth(value)}
                        style={styles.textInput}
                        value={width}
                    />
                    <Text style={styles.inputHeaderName}>DEPTH(CENTIMETERS)</Text>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        onChangeText={(value) => setDepth(value)}
                        style={styles.textInput}
                        value={depth}
                    />
                    <Text style={styles.inputHeaderName}>WEIGHT(IN KILO GRAM)</Text>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        onChangeText={(value) => setWeight(value)}
                        style={styles.textInput}
                        value={weight}
                    />
                    <Text style={styles.inputHeaderName}>PUBLIC URL</Text>
                    <TextInput
                        onChangeText={(value) => setUrl(value)}
                        style={styles.textInput}
                        value={url}
                    />
                    <Text style={styles.inputHeaderName}>EXCHANGE & RETURNS </Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(value) => setExchangeInfo(value)}
                        style={{ ...styles.textInput, height: moderateScale(100), textAlignVertical: 'top' }}
                        value={exchangeInfo}
                    />
                    <Text style={styles.inputHeaderName}>SHIPPING INFO </Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(value) => setShippingInfo(value)}
                        style={{ ...styles.textInput, height: moderateScale(100), textAlignVertical: 'top' }}
                        value={shippingInfo}
                    />
                    <Text style={styles.inputHeaderName}>CARE INSTRUCTIONS </Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(value) => setCareInfo(value)}
                        style={{ ...styles.textInput, height: moderateScale(100), textAlignVertical: 'top' }}
                        value={careInfo}
                    />
                    <View style={{ flexDirection: 'row', marginTop: moderateScale(8), alignItems: 'center' }}>
                        <CheckBox
                            onValueChange={(newValue) => {
                                setIsCustomised(newValue);
                            }}
                            value={isCustomised}
                        />
                        <Text style={{ ...styles.inputHeaderName, marginTop: 0, marginLeft: moderateScale(8) }}>Customized Order Applicable</Text>
                    </View>
                    <DefaultButton buttonText={EditData ? 'UPDATE' : 'ADD'} onPress={() => validateData()} showLoader={loader} />
                </View>
            </ScrollView>
            <PointShowCase pointsEarned={earned} totalPoints={total} />
        </SafeAreaView>
    );
};


const mapStateToProps = (state) => {
    return {
        userDetails: state.userObj.user
    };
};

export default connect(mapStateToProps)(AddSellerProductScreen);