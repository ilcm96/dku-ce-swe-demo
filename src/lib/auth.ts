interface VerificationResult {
  name: string;
  birthdate: string;
  phone: string;
}

export const verifyIdentity = async (): Promise<VerificationResult> => {
  // TODO: 실제 본인인증 서비스 연동 로직으로 대체
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "홍길동",
        birthdate: "1990-01-01",
        phone: "010-1234-5678",
      });
    }, 1000);
  });
};

export const validatePassword = (password: string): boolean => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

export const checkIdAvailability = async (id: string): Promise<boolean> => {
  // TODO: 실제 API 호출로 대체
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id !== "admin" && id !== "test");
    }, 500);
  });
};
