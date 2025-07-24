package logger

import (
	"fmt"
	nested "github.com/antonfisher/nested-logrus-formatter"
	rotatelogs "github.com/lestrrat-go/file-rotatelogs"
	"github.com/rifflock/lfshook"
	"github.com/sirupsen/logrus"
	"io/ioutil"
	"path"
	"runtime"
	"strings"
	"time"
	"yqw_project/structure"
)

func ConfigLocalFilesystemLogger(logConfig structure.LogConfig) logrus.Hook {
	writer, err := rotatelogs.New(
		logConfig.LogPath+".%Y%m%d.log",
		rotatelogs.WithLinkName(logConfig.LogPath),            // 生成软链，指向最新日志文件
		rotatelogs.WithRotationSize(logConfig.Size*1024*1024), //5MB
		rotatelogs.WithRotationCount(logConfig.Count),         //最多分隔文件数3
		rotatelogs.WithLocation(time.Local),
		rotatelogs.WithRotationTime(time.Minute),
	)
	logrus.SetLevel(getLogLevel(logConfig.Level))
	if err != nil {
		logrus.Errorf("config local file system logger error. %s", err)
	}
	logrus.SetReportCaller(true)
	lfHook := lfshook.NewHook(lfshook.WriterMap{
		logrus.DebugLevel: writer, // 为不同级别设置不同的输出目的
		logrus.InfoLevel:  writer,
		logrus.WarnLevel:  writer,
		logrus.ErrorLevel: writer,
		logrus.FatalLevel: writer,
		logrus.PanicLevel: writer,
	}, &nested.Formatter{
		NoColors:       true,
		NoFieldsColors: true,
		CallerFirst:    true,
		CustomCallerFormatter: func(f *runtime.Frame) string {
			s := strings.Split(f.Function, ".")
			funcName := s[len(s)-1]
			return fmt.Sprintf(" [%s:%d][%s()]", path.Base(f.File), f.Line, funcName)
		},
	})
	return lfHook
}

func InitLogHook(logConfig structure.LogConfig) {
	hooks := logrus.LevelHooks{}
	logrus.SetOutput(ioutil.Discard)
	logrus.StandardLogger().ReplaceHooks(hooks)
	logrus.AddHook(ConfigLocalFilesystemLogger(logConfig))
	logrus.SetFormatter(&logrus.JSONFormatter{})
}

func getLogLevel(level string) logrus.Level {
	switch level {
	case "panic":
		return logrus.PanicLevel
	case "warn":
		return logrus.WarnLevel
	case "debug":
		return logrus.DebugLevel
	case "error":
		return logrus.ErrorLevel
	case "fatal":
		return logrus.FatalLevel
	case "trace":
		return logrus.TraceLevel
	default:
		return logrus.InfoLevel
	}
}
