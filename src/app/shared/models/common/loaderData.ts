import { LoaderType } from '../../enum/loader-type.enum';

export interface LoaderData {
  showLoader: boolean;
  loaderMessage?: string;
  loaderType?: LoaderType;
}
