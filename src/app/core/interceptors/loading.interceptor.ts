import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { SkipLoading } from "../../features/loading/skip-loading.component";
import { LoadingService } from "../services/loading.service";

export const LoadingInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
        if(req.context.get(SkipLoading)) {
            return next(req);
        }
        const loadingService = inject(LoadingService);
        loadingService.loadingOn();
        return next(req)
            .pipe(
                finalize(() => {
                    loadingService.loadingOff()
                })
            )
}