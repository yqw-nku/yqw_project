package common

import (
	"flag"
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
	"yqw_project/common/logger"
)

func Viper() {
	flag.StringVar(&ConfigFile, "c", "", "choose config file.")
	flag.Parse()

	sysViper := viper.New()
	sysViper.SetConfigFile(ConfigFile)
	sysViper.SetConfigType("yaml")
	err := sysViper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	sysViper.WatchConfig()

	// 通过fsnotify文件监控，支持实时根据配置文件进行日志配置的变更
	sysViper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("config file changed:", e.Name)
		if err := sysViper.Unmarshal(&SysConfig); err != nil {
			fmt.Println(err)
		}
		logger.InitLogHook(SysConfig.LogCfg)
	})
	if err = sysViper.Unmarshal(&SysConfig); err != nil {
		fmt.Println(err)
	}
}
