import { useRouter } from "next/router";

import { api } from "@/utils/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import AnimatedLoaderIcon from "../loader-icon/animated-loader-icon";

export default function DeleteAccountConfirm() {
  const { mutate, isLoading, isSuccess } = api.user.remove.useMutation();
  const router = useRouter();

  const handleDeleteAccount = () => {
    mutate();
  };

  if (isSuccess) {
    void router.push("/");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div>
            {isLoading ? (
              <AnimatedLoaderIcon />
            ) : (
              <>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Continue
                </AlertDialogAction>
              </>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
