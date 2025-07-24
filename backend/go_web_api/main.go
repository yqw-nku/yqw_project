package go_web_api

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"yqw_project/common"
	"yqw_project/router"
)

func main() {
	common.InitEnv()

	// 起go-gin服务
	r := gin.Default()
	router.BindRouter(r)
	addr := common.SysConfig.DefaultCfg.ListenIp + ":" + common.SysConfig.DefaultCfg.ListenPort
	err := r.Run(addr)
	if err != nil {
		logrus.Errorf("go_web_api run error, %s", err.Error())
	}
}
