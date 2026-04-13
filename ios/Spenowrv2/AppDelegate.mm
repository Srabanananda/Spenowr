#import "AppDelegate.h"

#import <FirebaseCore/FirebaseCore.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React_RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <React_RCTAppDelegate/RCTReactNativeFactory.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>

@interface ReactNativeDelegate : RCTDefaultReactNativeFactoryDelegate
@end

@implementation ReactNativeDelegate

- (NSURL *_Nullable)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *_Nullable)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

@interface AppDelegate ()
@property (nonatomic, strong, readwrite) RCTReactNativeFactory *reactNativeFactory;
@property (nonatomic, strong) ReactNativeDelegate *reactNativeDelegate;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  self.reactNativeDelegate = [ReactNativeDelegate new];
  self.reactNativeFactory = [[RCTReactNativeFactory alloc] initWithDelegate:self.reactNativeDelegate];
  self.reactNativeDelegate.dependencyProvider = [RCTAppDependencyProvider new];
  return YES;
}

- (UISceneConfiguration *)application:(UIApplication *)application
    configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession
                                   options:(UISceneConnectionOptions *)options
{
  return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
}

@end
