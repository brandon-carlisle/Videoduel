import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      playlistUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

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
                  placeholder="eg: valid playlist url"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
