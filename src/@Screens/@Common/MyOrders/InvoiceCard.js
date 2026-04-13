/**
 *  Created By @name Sukumar_Abhijeet
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { GlobalStyles } from '../../../@GlobalStyles';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import FormHeader from '../../../@GlobalComponents/FormHeader';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';
import BuyAgain from '../../../@GlobalComponents/CartItem/BuyAgain';
import moment from 'moment';
import { downloadInvoice } from '../../../@Endpoints/Core/Tabs/EditProfile';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';

const { COLOR: { SUBANME, APP_PINK_COLOR } } = Config;

const InvoiceCard = ({ ...props }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);  // Loading state

    const { invoiceDetail } = props;
    const {
        // orderid = '',
        // product_order_status = '',
        // orderStatus = '',
        // paymentMode = '',
        // sub_total_amount = '',
        // created_date = '',
        // txn_id_payment_gateway = '',
        // orderCurrency = ''
        invoice_id,
        invoice_type,
        amount,
        created_date,
        status

    } = invoiceDetail;

    
    const downloadPDF = async () => {
        setLoading(true);  // Start loading
        downloadInvoice(invoice_id)
            .then(async res => {
                if (res.status === 'success' && res.data && res.data.url) {
                    const fileUrl = res.data.url;
                    const fileName = `${invoice_id}.pdf`;
                    const downloadDir = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
                    const filePath = `${downloadDir}/${fileName}`;

                    try {
                        // Start the download
                        await RNFS.downloadFile({
                            fromUrl: fileUrl,
                            toFile: filePath,
                        }).promise;

                        // Notify success and show the file path
                        Toast.show(`PDF downloaded successfully to: ${filePath}`, Toast.LONG);

                    } catch (error) {
                        console.error('Download failed:', error);
                        Toast.show('Failed to download file.', Toast.LONG);
                    }
                } else {
                    Toast.show('PDF URL not available!', Toast.LONG);
                }
            })
            .catch(() => {
                Toast.show('PDF Loading Failed!', Toast.LONG);
            })
            .finally(() => {
                setLoading(false);  // Stop loading
            });
    };

    return (
        <View style={[GlobalStyles.primaryCard, styles.container]}>
            <FormHeader headerText={`Invoice ID :  ${invoice_id}`} />
            <View style={styles.containerWrapper}>
                <Text style={styles.headerText}>
                    Activity : <Text style={styles.dataText}>{invoice_type}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Amount : <Text style={styles.dataText}>{amount} </Text>
                </Text>
                <Text style={styles.headerText}>
                    Invoice Date : <Text style={styles.dataText}>{created_date ? moment(created_date).format('MMMM Do YYYY') : ''}</Text>
                </Text>
                <Text style={styles.headerText}>
                    Payment Status : <Text style={[styles.dataText, {color: '#4CAF50'}]}>{status === "1" ? "Paid" : "N/A"}</Text>
                </Text>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={() => downloadPDF()}  style={GlobalStyles.seeMoreButton}>
                        {loading ? <ActivityIndicator color={APP_PINK_COLOR} /> : 
                        <Text style={GlobalStyles.seeMoreButtonText}>Download PDF</Text> }
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

InvoiceCard.propTypes = {
    invoiceDetail: PropTypes.object.isRequired,
};

export default InvoiceCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: moderateScale(10),
    },
    containerWrapper: {
        padding: moderateScale(10)
    },
    headerText: {
        color: SUBANME,
        marginVertical: moderateScale(5)
    },
    dataText: {
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: moderateScale(170),
        justifyContent: 'space-between',
        marginTop: moderateScale(10)
    }
});