# React Native InApp Notifications [![npm version](https://badge.fury.io/js/react-native-internal-notification.svg)](https://badge.fury.io/js/react-native-internal-notification)

Typescript component to show internal notifications for react native application

## Install

```bash
yarn add react-native-internal-notification
```

## Props

| Name        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| title       | Notification title                                                                   |
| message     | Message                                                                              |
| onPress     | The callback                                                                         |
| icon        | React component passed no notification. For example you can use `@expo/vector-icons` |
| showingTime | Timeout in ms how long notification show be visible on the screen                    |
| color       | Background color for notification                                                    |

## Usage

Step 1.

Wrap your app or root component with Notification provider

```javascript
import { NotificationProvider } from 'react-native-internal-notification';
import App from './App';

const Application = function () {
    return (
        <NotificationProvider>
            <App />
        </NotificationProvider>
    );
};
```

Step 2.

Call show notification from any your components

```javascript
import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useNotification } from 'react-native-internal-notification';

export default function DevScreen() {
    const notification = useNotification();

    const handleNotificationTestClick = useCallback(() => {
        notification.showNotification({
            title: 'My first notification',
            message: 'Hello from my first message',
            icon: <FontAwesome name="check-circle" size={45} />,
            onPress: () => {
                alert('Pressed');
            },
        });
    }, [notification]);

    return (
        <>
            <TouchableOpacity onPress={handleNotificationTestClick}>
                <Text>Show notification</Text>
            </TouchableOpacity>
        </>
    );
}
```

## Small Demo and How it works

![How react-native-internal-notification works](https://im4.ezgif.com/tmp/ezgif-4-306ef3593534.gif)
