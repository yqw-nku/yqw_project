package common

import "yqw_project/common/logger"

func InitEnv() {
	// 加载配置文件
	Viper()
	logger.InitLogHook(SysConfig.LogCfg)
}
