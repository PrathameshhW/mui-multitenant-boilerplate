export const getApiMessage = (response: any) => {
  return response?.message || response?.data?.message || "Something went wrong";
};
