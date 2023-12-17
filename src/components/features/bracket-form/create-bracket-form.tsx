import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { api } from "@/utils/api";

import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import AnimatedLoaderIcon from "../loader-icon/animated-loader-icon";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least 1 character(s)" }),
  playlistUrl: z
    .string()
    .url()
    .startsWith("https://www.youtube.com/playlist?list=")
    .refine((url) => {
      const playlistIdRegex = /list=([a-zA-Z0-9_-]+)/;
      const match = url.match(playlistIdRegex);
      return match !== null && match.length >= 2;
    }, "Invalid YouTube playlist ID"),
});

export default function CreateBracketForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      playlistUrl: "",
    },
  });

  const { mutate, isLoading, isSuccess, data, error } =
    api.bracket.create.useMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const playlistId = values.playlistUrl.split("?list=")[1];

    if (!playlistId) return;

    mutate({
      name: values.name,
      playlistId,
    });
  };

  if (isSuccess) void router.push(`/bracket/${data.bracketId}`);

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:w-2/3 xl:w-1/2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bracket Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg: best hp movie scenes"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormDescription>
                This is the name of your bracket.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playlistUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playlist</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg: https://www.youtube.com/playlist?list=PLRNq9152NuhK2Q4b1LwomqlP5T5HpZ1l2"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormDescription>
                This is the full url of the public YouTube playlist you want to
                make a bracket for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error?.message ? <FormMessage>{error.message}</FormMessage> : null}

        {isLoading || isSuccess ? (
          <Button disabled>
            <AnimatedLoaderIcon />
            Loading
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
