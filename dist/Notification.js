import React, { useCallback, useContext, useState, useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text, Platform, } from 'react-native';
const NotificationContext = React.createContext({
    showNotification: () => { },
    isNotificationShown: false,
});
export function useNotification() {
    return useContext(NotificationContext);
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 0,
        zIndex: 1000,
        elevation: 1,
    },
    containerShown: {
        height: 65,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        maxWidth: 400,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.15,
        flexDirection: 'row',
        elevation: 5,
    },
    contentIcon: {
        width: 45,
        height: 45,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTextWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
    },
    contentTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    contentMessage: {
        fontSize: 13,
        color: '#777',
    },
});
function Notification({ children }) {
    const [notification, setNotification] = useState();
    const [animatedValue] = useState(new Animated.Value(0));
    const hideTimer = useRef();
    const handleHideNotification = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            // Finished
            setNotification(undefined);
        });
    }, [animatedValue]);
    const handleShowNotification = useCallback(({ title, showingTime = 2000, onPress, message, icon, color = '#fff' }) => {
        if (!notification) {
            setNotification({
                title,
                onPress,
                showingTime,
                message,
                icon,
                color,
            });
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false,
            }).start(() => {
                // Finished
                hideTimer.current = window.setTimeout(() => {
                    handleHideNotification();
                }, showingTime);
            });
        }
    }, [animatedValue, notification, handleHideNotification]);
    const handlePressNotification = useCallback(() => {
        if (notification && notification.onPress) {
            notification.onPress();
            setNotification(undefined);
            clearTimeout(hideTimer.current);
        }
    }, [notification]);
    useEffect(() => {
        return () => {
            clearTimeout(hideTimer.current);
        };
    }, [notification]);
    const content = useMemo(() => {
        if (notification) {
            return (<Animated.View style={{
                    ...{
                        transform: [
                            {
                                translateY: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50],
                                }),
                            },
                        ],
                        opacity: Platform.OS !== 'android'
                            ? animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                            : 1,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    },
                }}>
                    <TouchableOpacity onPress={handlePressNotification} style={[styles.content, { backgroundColor: notification.color }]}>
                        {notification.icon ? (<View style={styles.contentIcon}>{notification.icon}</View>) : null}
                        <View style={styles.contentTextWrapper}>
                            <Text numberOfLines={2} style={styles.contentTitle}>
                                {notification.title}
                            </Text>
                            {notification.message ? (<Text numberOfLines={2} style={styles.contentMessage}>
                                    {notification.message}
                                </Text>) : null}
                        </View>
                    </TouchableOpacity>
                </Animated.View>);
        }
    }, [notification, animatedValue]);
    const style = [styles.container];
    if (notification) {
        style.push(styles.containerShown);
    }
    return (<NotificationContext.Provider value={{
            showNotification: handleShowNotification,
            isNotificationShown: Boolean(notification),
        }}>
            <View style={style}>{content}</View>
            {children}
        </NotificationContext.Provider>);
}
export default Notification;
