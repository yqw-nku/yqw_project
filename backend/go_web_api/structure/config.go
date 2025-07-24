package structure

type ServerDefaultCfg struct {
	ListenIp   string `json:"listen_ip"`
	ListenPort string `json:"listen_port"`
}

type LogConfig struct {
	LogPath string `json:"log_path,omitempty"`
	Size    int64  `json:"log_size" json:"size,omitempty"`
	Count   uint   `json:"file_count" json:"count,omitempty"`
	Level   string `json:"log_level" json:"level,omitempty"`
}

type Server struct {
	DefaultCfg ServerDefaultCfg `json:"default_cfg"`
	LogCfg     LogConfig        `json:"log_cfg"`
}
