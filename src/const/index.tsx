// Api
import axios, { AxiosResponse } from "axios";
import { UseQueryOptions } from "@tanstack/react-query";

// axios.defaults
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
};

export namespace Api {
  // axiosApi
  const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    withCredentials: true,
  });

  // isAxiosError
  export const isAxiosError = axios.isAxiosError;

  // reactQueryOptions
  export const reactQueryOptions: UseQueryOptions = {
    retry: 0,
    initialData: undefined,
    refetchOnMount: false,
    // staleTime: 1000 * 60 * 0,
    cacheTime: 1000 * 60 * 5,
  };

  export type FirebaseUser = {
    token: string;
  };

  // ClassCList
  export type ClassCList = {
    uuid: string;
    ref_uuid?: string;

    ip_v4_address: string;
    url?: string;

    hardware?: string;

    vm_name?: string;
    not_vmware_installed?: string;
    not_running?: string;
    usage?: string;

    os?: string;
    user?: string;
    password?: string;
    root_password?: string;

    boot_confirmation_priority?: string;
    boot_confirmation_details?: string;

    before_uuid: string | null;
    updated_column: string;

    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
  };

  export type CclWithSort = ClassCList & { sort: number };

  // csrf
  export const csrf = async (): Promise<void> => {
    await axiosApi.get("sanctum/csrf-cookie", {
      headers: { Accept: "application/json" },
    });
  };

  // getClassCList
  export const getClassCList = async (): Promise<
    AxiosResponse<CclWithSort[]>
  > => {
    await csrf();
    const response = await axiosApi.get<CclWithSort[]>("api/class-c-list");
    return response;
  };

  // postClassCList
  export const postClassCList = async (
    updater: CclWithSort
  ): Promise<AxiosResponse> => {
    const response = await axiosApi.post("api/class-c-list", updater);
    return response;
  };

  // putClassCList
  export const putClassCList = async (
    updater: CclWithSort
  ): Promise<AxiosResponse> => {
    const response = await axiosApi.put("api/class-c-list", updater);
    return response;
  };

  // deleteClassCList
  export const deleteClassCList = async (
    updater: CclWithSort
  ): Promise<AxiosResponse> => {
    const response = await axiosApi.delete("api/class-c-list", {
      data: updater,
    });
    return response;
  };

  // postAuthToken
  export const postAuthToken = async (
    token: string
  ): Promise<AxiosResponse> => {
    const response = await axiosApi.post("api/auth", { token });
    return response;
  };
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export namespace Fb {
  // Your web app's Firebase configuration
  export const config = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  };

  // Initialize Firebase
  export const app = initializeApp(config);
  export const init = () => initializeApp(config);
}
