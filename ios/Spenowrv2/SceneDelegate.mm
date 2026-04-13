#import "SceneDelegate.h"
#import "AppDelegate.h"

#import <React_RCTAppDelegate/RCTReactNativeFactory.h>

/// Map cold-start URL from scene connection into RN `launchOptions` (Linking initial URL).
static NSDictionary *_Nullable RCTLaunchOptionsFromSceneConnectionOptions(UISceneConnectionOptions *options)
{
  if (!options || options.URLContexts.count == 0) {
    return nil;
  }
  NSURL *url = ((UIOpenURLContext *)options.URLContexts.anyObject).URL;
  return url ? @{UIApplicationLaunchOptionsURLKey : url} : nil;
}

@implementation SceneDelegate

- (void)scene:(UIScene *)scene
    willConnectToSession:(UISceneSession *)session
                options:(UISceneConnectionOptions *)connectionOptions
{
  if (![scene isKindOfClass:[UIWindowScene class]]) {
    return;
  }
  UIWindowScene *windowScene = (UIWindowScene *)scene;
  self.window = [[UIWindow alloc] initWithWindowScene:windowScene];

  AppDelegate *appDelegate = (AppDelegate *)UIApplication.sharedApplication.delegate;
  appDelegate.window = self.window;
  NSDictionary *launchOptions = RCTLaunchOptionsFromSceneConnectionOptions(connectionOptions);
  [appDelegate.reactNativeFactory startReactNativeWithModuleName:@"Spenowrv2"
                                                        inWindow:self.window
                                                   launchOptions:launchOptions];
}

- (void)sceneDidDisconnect:(UIScene *)scene
{
}

@end
