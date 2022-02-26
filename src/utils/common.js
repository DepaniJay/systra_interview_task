export const getLocalStorageItems = () => {
  const token = localStorage.getItem("x-access-token");
  return {
    token: token ? token : null,
  };
};
