export enum AnalysisMode {
  IMAGE = 'IMAGE',
  URL = 'URL'
}

export enum AppScreen {
  STARTUP = 'STARTUP',
  HOME = 'HOME',
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  URL_INPUT = 'URL_INPUT',
  URL_ANALYZING = 'URL_ANALYZING',
  URL_RESULT = 'URL_RESULT',
  ABOUT = 'ABOUT'
}

export interface AnalysisResult {
  score: number; // 0 to 100
  isFake: boolean;
  details: string;
}

export interface UploadedImage {
  src: string;
  file?: File;
}

export interface AnalysisMetric {
  protocol_check: string;
  domain_structure: string;
  tld_analysis: string;
  subdomain_count: number;
  url_reputation: string;

}

export interface URLAnalysisResult {
  verdict: string;
  confidence_score: number;
  protocol: string;
  https_status: string;

  threat_message: string;
  recommendation: string;
  analysis_metric: AnalysisMetric;
}