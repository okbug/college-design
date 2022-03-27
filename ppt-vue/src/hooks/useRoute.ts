export const locationInfo = window.location

const useParmas = (): { id: string } => {

  const params = {
    id: ''
  };
  const { search } = locationInfo;
  search
    .split("?")
    .filter((i) => i)
    .map((i) => i.split("="))
    .forEach((item) => {
      const [key, value] = item;
      params[key] = value;
    });

  return params;
};

export default useParmas;
