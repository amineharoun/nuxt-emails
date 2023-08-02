export default defineEventHandler((event) => {
  const { id } = event.context.params;
  return {
    mail: {
      id: parseInt(id),
      title: "Wave hello with video, reactions and more now in huddles",
      content:
        "In the early days of the pandemic, audio-only huddles helped recreate the informal discussions that traditionally took place in office cafés and hallways. Whether your team is remote, in the office, or a mix of both, working alongside your colleagues is as important as ever.",
      read: false,
      userId: 22,
    },
  };
});
