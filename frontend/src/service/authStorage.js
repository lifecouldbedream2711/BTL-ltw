  export const saveToken = (token) => {
    localStorage.setItem("token", token);

    // decode payload JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = {
      id: payload.userId,              // claim bạn tự thêm ở backend
      role: payload.scope || payload.role,
      email: payload.sub,              // vì backend set subject = email
    };

    localStorage.setItem("user", JSON.stringify(user));
  };

  export const getToken = () => localStorage.getItem("token");
  export const getUser = () => JSON.parse(localStorage.getItem("user") || "null");
  export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };