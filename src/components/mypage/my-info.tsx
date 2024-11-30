import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserInfo {
  id: string;
  name: string;
  gender: string;
  phoneNumber: string;
}

interface MyInfoProps {
  userInfo: UserInfo;
}

export default function MyInfo({ userInfo }: MyInfoProps) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // 모든 필드가 입력되었는지 확인
    const allFieldsFilled = Boolean(
      passwords.current && passwords.new && passwords.confirm,
    );

    // 비밀번호 유효성 검사 (8자 이상, 영문, 숫자, 특수문자 포함)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isNewPasswordValid = passwordRegex.test(passwords.new);

    // 새 비밀번호와 확인이 일치하는지 확인
    const doPasswordsMatch = passwords.new === passwords.confirm;

    // 에러 메시지 설정
    if (passwords.new && !isNewPasswordValid) {
      setPasswordError(
        "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
      );
    } else if (passwords.new && passwords.confirm && !doPasswordsMatch) {
      setPasswordError("새 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError(null);
    }

    setIsValid(
      Boolean(allFieldsFilled && isNewPasswordValid && doPasswordsMatch),
    );
  }, [passwords]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // TODO: API 호출로 비밀번호 변경
    console.log("비밀번호 변경:", passwords);

    setShowPasswordDialog(false);
    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordError(null);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">이름</Label>
        <Input
          type="text"
          id="name"
          value={userInfo.name}
          readOnly
          className="bg-muted"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="gender">성별</Label>
        <Input
          type="text"
          id="gender"
          value={userInfo.gender}
          readOnly
          className="bg-muted"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          type="tel"
          id="phoneNumber"
          value={userInfo.phoneNumber}
          readOnly
          className="bg-muted"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          id="id"
          value={userInfo.id}
          readOnly
          className="bg-muted"
        />
      </div>

      <div className="pt-4">
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              비밀번호 변경
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handlePasswordChange}>
              <DialogHeader>
                <DialogTitle>비밀번호 변경</DialogTitle>
                <DialogDescription>
                  새로운 비밀번호를 입력해주세요.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">현재 비밀번호</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        current: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        new: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
                >
                  변경하기
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
