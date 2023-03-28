export const cls = (...classNames: string[]) => {
  return classNames.join(" ");
};

export const cloudflareImg = (id: string, size: string = "public"): string =>
  `https://imagedelivery.net/yJC6Z7NpaGQ_RoEViD1TVw/${id}/${size}`;
