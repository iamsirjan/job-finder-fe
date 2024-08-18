import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiResponse, api } from './service-api';
import { HttpClient } from './service-axios';
import { IUserDetails } from './service-user';

export interface IChatParticipant {
  id: number;
  phone: string;
  email: string;
  name: string;
  profile_picture: string;
  address: string;
  is_student: boolean;
  is_teacher: boolean;
  is_agent: boolean;
  is_organization: boolean;
  is_superuser: boolean;
  is_registered: boolean;
  step_of_register: string | null;
}

export interface IChatMessage {
  id: number;
  chat: number;
  sender: IChatParticipant;
  content: string;
  file: string | null;
  created_at: string;
  updated_at: string;
}

export interface IChatData {
  id: number;
  participant1: IChatParticipant;
  participant2: IChatParticipant;
  messages: IChatMessage[];
}

export interface IChatApiResponse {
  message: string;
  data: IChatData;
  success: boolean;
}

export interface IRecentChatResponse {
  id: string;
  is_seen: true;
  latest_message: {
    content: string;
    file: string;
    created_at: string;
  };
  participant1: {
    id: string;
    name: string;
    profile_picture: string;
  };
  participant2: {
    id: string;
    name: string;
    profile_picture: string;
  };
}

const getChatUsers = async ({ user }: { user: string }) => {
  const { data } = await HttpClient.get<ApiResponse<IUserDetails[]>>(
    api.chat.user,
    {
      params: { search: user },
    },
  );
  return data.data;
};

export const useGetChatUsers = ({ user }: { user: string }) => {
  return useQuery(['chatuser', user], () =>
    getChatUsers({
      user: user,
    }),
  );
};

const getChat = async ({ user }: { user: string }) => {
  const { data } = await HttpClient.get<IChatApiResponse>(
    api.chat.getUserChat,
    {
      params: { user: user },
    },
  );
  return data.data;
};

export const useGetChat = ({ user }: { user: string }) => {
  const query = useQueryClient();
  return useQuery(
    ['userchat', user],
    () =>
      getChat({
        user: user,
      }),

    {
      refetchInterval: 1000,
      enabled: !!user,
      onSuccess: () => {
        query.invalidateQueries('recentchat');
      },
    },
  );
};

const sendChat = async (formData: FormData) => {
  const { data } = await HttpClient.post<ApiResponse<IUserDetails>>(
    api.chat.chat,
    formData,
  );

  return data.data;
};

export const useSendChat = () => {
  const queryClient = useQueryClient();
  return useMutation(sendChat, {
    onSuccess: () => {
      queryClient.invalidateQueries('recentchat');
    },
  });
};

const getRecentChat = async () => {
  const { data } = await HttpClient.get<ApiResponse<IRecentChatResponse[]>>(
    api.chat.recentChat,
  );
  return data;
};

export const useGetRecentChat = () => {
  return useQuery(['recentchat'], () => getRecentChat());
};
