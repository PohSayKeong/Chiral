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
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "stream-chat-react/dist/css/index.css";

const Chatbox = (props) => {
    const [chatClient, setChatClient] = useState(null);
    let channel;

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(
                process.env.NEXT_PUBLIC_GETSTREAM_KEY
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

    async function uploadImage(event) {
        const response = await channel.sendImage(event.target.files[0]);
        await channel.sendMessage({
            attachments: [
                {
                    type: "image",
                    image_url: response.file,
                },
            ],
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
                        <div className="inputBar">
                            <MessageInput focus={true} />
                            <label htmlFor="icon-button-file">
                                <input
                                    accept="image/*"
                                    id="icon-button-file"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={uploadImage}
                                />
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    );
};

export default Chatbox;
