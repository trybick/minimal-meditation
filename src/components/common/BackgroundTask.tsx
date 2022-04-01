import { WebView } from 'react-native-webview';

type Props = {
  interval: number;
  functionToRun: () => void;
};

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
