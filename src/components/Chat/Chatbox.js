import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window,
    LoadingIndicator,
} from "stream-chat-react";
import CloseChatButton from "./CloseChatButton";
import { CustomMessageInput } from "./CustomMessageInput";

import "stream-chat-react/dist/css/index.css";
import "./Chatbox.css";

const Chatbox = (props) => {
    const [chatClient, setChatClient] = useState(null);
    let channel;

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(
                process.env.REACT_APP_GETSTREAM_KEY
            );
            if (!client._user) {
                await client.connectUser(
                    {
                        id: props.info.user,
                        name: props.info.user,
                    },
                    client.devToken(props.info.user)
                );
            }

            setChatClient(client);
        };
        initChat();
    }, [props.info.user]);

    if (!chatClient) {
        return <LoadingIndicator />;
    } else {
        channel = chatClient.channel("messaging", props.info.index, {
            // add as many custom fields as you'd like
            name: props.info.identifier,
        });
    }

    return (
        <div className="container">
            <Chat client={chatClient} theme="messaging light">
                <Channel channel={channel} Input={CustomMessageInput}>
                    <Window>
                        <div className="header">
                            <ChannelHeader />
                            <CloseChatButton />
                        </div>
                        <div className="messages">
                            <MessageList />
                        </div>
                        <MessageInput focus={true} />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    );
};

export default Chatbox;
