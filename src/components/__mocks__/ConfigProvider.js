
export const ConfigContext = jest.fn(() => ({
  app: {
    TITLE: "Mock"
  }
}));
export const ConfigProvider = ({ children }) => children();
export const ConfigConsumer = ({ children }) => children(ConfigContext());

export default ConfigProvider;
