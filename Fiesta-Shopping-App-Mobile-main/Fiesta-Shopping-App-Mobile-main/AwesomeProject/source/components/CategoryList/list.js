import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppStyles } from '../../css/styles/CommonStyles';
import { commonStyles } from '../../css/styles/CommonStyles';
import { AppContext } from '../../util/AppContext';

export const ListCategory = ({ data, style, subcategorySelected, expand, setSubCategorySelected, categorySelected, setCategorySelected }) => {
    const { theme } = useContext(AppContext);
    const [subcategoryArray, setSubCategoryArray] = useState([]);
    const [indexSelected, setIndexSelected] = useState(null);
    const [category, setCategory] = useState([]);


    useEffect(() => {
        if (data) {
            setCategory(data);
        }
    }, [data]);

    useEffect(() => {
        if (subcategoryArray.length > 0 && indexSelected !== null) {
            const newCategoryArr = [...category];
            const newSubcategoryArr = subcategoryArray.map(item => { return { ...item, isSubCategory: true } })
            setSubCategoryArray(newSubcategoryArr)
            newCategoryArr.splice(indexSelected + 1, 0, ...newSubcategoryArr);
            setCategory(newCategoryArr);
        }
    }, [indexSelected]);
    useEffect(() => {
        if (expand)
            if (((category.length > 0 && indexSelected === null) || subcategoryArray.length == 0) && categorySelected) {
                setIndexSelected(category.findIndex(item => item._id === categorySelected));
            }
    }, [categorySelected]);
    const onDeleteCategory = () => {
        if (subcategoryArray.length > 0 && indexSelected !== null) {
            const newCategoryArr = [...category];
            console.log("DELETE    " + indexSelected);

            const newArr = newCategoryArr.filter((item) => { return !subcategoryArray.includes(item) })
            setCategory(newArr);
            setSubCategoryArray([]);
        }
        setIndexSelected(null)
    };

    return (
        <View style={style}>
            {category.length > 0 ? (
                category.map((item, index) => (
                    <View
                        style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
                        key={item._id}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {


                                if (typeof item.isSubCategory !== 'undefined') {
                                    setSubCategorySelected(item._id)

                                } else {
                                    if (index !== indexSelected || indexSelected == null) {
                                        onDeleteCategory();
                                        setCategorySelected(item._id);
                                        setSubCategoryArray(item.subCategory ? item.subCategory : []);
                                        setSubCategorySelected("")
                                    } else {
                                        onDeleteCategory();
                                        setCategorySelected("");
                                        setSubCategoryArray([]);
                                        setSubCategorySelected("")
                                    }
                                }
                                if (subcategorySelected == item._id) {

                                    setSubCategorySelected("")
                                }
                            }}
                            style={[
                                AppStyles.StyleSearchScreen.listCat,
                                { backgroundColor: categorySelected === item._id ? theme.secondary : subcategorySelected == item._id ? '#a9a9a9' : theme.primary }
                            ]}
                            key={item._id}
                        >
                            <Text
                                style={[
                                    commonStyles.normalText,
                                    { color: categorySelected === item._id || subcategorySelected == item._id ? theme.primary : theme.secondary }
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <View />
            )}
        </View>
    );
};
