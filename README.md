# React Native InApp Notifications

Typescript component to show internal notifications for react native application

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
import { NotificationProvider } from 'react-native-inapp-notification';
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

import { useNotification } from 'src/core/Notification';

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
