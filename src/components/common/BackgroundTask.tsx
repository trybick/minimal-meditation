import { WebView } from 'react-native-webview';

type Props = {
  interval: number;
  functionToRun: () => void;
};

// This is a hacky way to run a timer in the background. If this stops working, the next best method
// might be to use the react native background timer package but it requires ejecting.
function BackgroundTask(props: Props) {
  return (
    <WebView
      onMessage={props.functionToRun}
      source={{
        html: `<script>
          setInterval(()=>{window.ReactNativeWebView.postMessage("");}, ${props.interval})
          </script>`,
      }}
    />
  );
}

export default BackgroundTask;
