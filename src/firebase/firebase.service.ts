import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { TopicMessage } from 'firebase-admin/lib/messaging/messaging-api';
import * as serverAccount from '~/secret/firebase.json';
import { TopicMessageDataModel } from '../models/firebase';

@Injectable()
export class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(
                serverAccount as admin.ServiceAccount,
            ),
        });
    }

    async messageGenerator(
        title: string,
        body: string,
        topic: string,
        type: string,
        data?: TopicMessageDataModel,
    ): Promise<TopicMessage> {
        if (!data)
            data = {
                title: title,
                body: body,
                type: type,
            };
        else {
            data.title = title;
            data.body = body;
        }

        const message: TopicMessage = {
            notification: {
                title,
                body,
            },
            topic,
            data: data as unknown as { [key: string]: string },
            android: {
                collapseKey: type,
                priority: 'high',
                ttl: 10 * 60 * 1000, // 10 minutes
                notification: {
                    tag: type === 'period' ? type : null,
                    priority: 'high',
                    sound: 'default',
                    channelId: 'high_importance_channel',
                },
            },
            apns: {
                headers: {
                    'apns-priority': '10',
                    'apns-expiration': '600', // 10 minutes
                },
                payload: {
                    aps: {
                        badge: 0,
                        sound: 'default',
                    },
                },
            },
        };

        return message;
    }

    async sendNotificationByTopic(
        type: string,
        topic: string,
        title: string,
        body: string,
        data?: TopicMessageDataModel,
    ) {
        const message = await this.messageGenerator(
            title,
            body,
            topic,
            type,
            data,
        );

        try {
            await admin
                .messaging()
                .send(message)
                .then((response) => {
                    console.log(new Date(), topic, body, response);
                });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
