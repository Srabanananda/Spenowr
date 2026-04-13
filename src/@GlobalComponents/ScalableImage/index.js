import React, { useState, useEffect } from 'react';
import { ImageBackground, Image as RNImage } from 'react-native';
import Image from 'react-native-image-progress';
import { moderateScale } from 'react-native-size-matters';

const ScaledImage = (props) => {
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const updateAspectRatio = (width, height) => {
            if (isMounted) {
                setAspectRatio(width / height);
            }
        };

        const source = props.source;

        if (source == null) {
            console.warn('ScaledImage did not receive a source.');
        } else if (Array.isArray(source)) {
            console.warn('ScaledImage received an array as source instead of local file resource or ImageURISource.');
        } else if (typeof source === 'number') {
            const resolved = RNImage.resolveAssetSource(source);
            if (resolved != null) {
                updateAspectRatio(resolved.width, resolved.height);
            }
        } else if (typeof source === 'object' && source.uri) {
            RNImage.getSize(
                source.uri,
                (width, height) => {
                    updateAspectRatio(width, height);
                },
                (err) => {
                    console.error(err);
                },
            );
        } else {
            console.warn('ScaledImage did not receive a valid source uri.');
        }

        return () => {
            isMounted = false;
        };
    }, [props.source]);

    if (!aspectRatio) return null;

    const imageStyle = [{
        aspectRatio,
        width: '100%',
        borderRadius: moderateScale(8),
        overflow: 'hidden',
    }, props.style];

    if (props.useBackground) {
        return <ImageBackground {...props} style={imageStyle}>{props.children}</ImageBackground>;
    }

    return <Image {...props} style={imageStyle} />;
};

export default ScaledImage;
