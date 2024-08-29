import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routeStore = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    return (path && ['compA', 'compB'].includes(path)) as boolean;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.routeStore.set(route.routeConfig?.path as string, handle);
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    return (
      (path && ['compA', 'compB'].includes(path) && !!this.routeStore.get(path)) as boolean
    );
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path = route.routeConfig?.path;
    return this.routeStore.get(path as string) as DetachedRouteHandle;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}