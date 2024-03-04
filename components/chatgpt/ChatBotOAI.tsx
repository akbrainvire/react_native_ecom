import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {OpenAI} from 'openai';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';

const openai = new OpenAI({
  apiKey: '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',
});

const ChatGPTSupport = () => {
  //   const [messages, setMessages] = useState<any>(['hello there how are you']);

  //   useEffect(() => {
  //     fetchMessage('hello');
  //   }, []);

  //   const fetchMessage = async (text: any) => {
  //     try {
  //       const response = await openai.chat.completions.create({
  //         model: 'gpt-3.5-turbo',
  //         messages: [{role: 'user', content: text}],
  //       });

  //       const botMessage = response;
  //       console.log(botMessage);
  //     //   appendMessage(botMessage, 'ChatGPT');
  //     } catch (error) {
  //       console.error('Error fetching message:', error);
  //     }
  //   };

  //   const appendMessage = (message: any, user: any) => {
  //     const newMessage = {
  //       _id: messages.length + 1,
  //       text: message,
  //       createdAt: new Date(),
  //       user: {
  //         _id: user,
  //         name: user,
  //       },
  //     };

  //     setMessages((prevMessages: any) =>
  //       GiftedChat.append(prevMessages, [newMessage]),
  //     );
  //   };

  //   const onSend = (newMessages: any = []) => {
  //     const text = newMessages[0].text;
  //     appendMessage(text, 'user');
  //     fetchMessage(text);
  //   };

  //   return (
  //     <GiftedChat
  //       messages={messages}
  //       onSend={(newMessages: any) => onSend(newMessages)}
  //       user={{
  //         _id: 'user',
  //       }}
  //     />
  //   );
  const [response, setResponse] = useState('');

  const fetchAIResponse = async () => {
    const apiKey = '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';
    const prompt = 'Once upon a time';

    try {
      const result = await fetch(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 50,
          }),
        },
      );

      const data = await result.json();
      console.log(data);

      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <View>
      <Button title="Generate AI Text" onPress={fetchAIResponse} />
      <Text>{response}</Text>
    </View>
  );
};

export default ChatGPTSupport;
