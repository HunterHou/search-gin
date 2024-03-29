package datamodels

type DiskStatus struct {
	All  int64
	Used int64
	Free int64
}

func DiskUseStatus(path string) (disk DiskStatus) {

	// h := windows.MustLoadDLL("kernel32.dll")
	// c := h.MustFindProc("GetDiskFreeSpaceExW")
	// lpFreeBytesAvailable := uint64(0)
	// lpTotalNumberOfBytes := uint64(0)
	// lpTotalNumberOfFreeBytes := uint64(0)
	// c.Call(uintptr(unsafe.Pointer(windows.StringToUTF16Ptr(path))),
	// 	uintptr(unsafe.Pointer(&lpFreeBytesAvailable)),
	// 	uintptr(unsafe.Pointer(&lpTotalNumberOfBytes)),
	// 	uintptr(unsafe.Pointer(&lpTotalNumberOfFreeBytes)))
	// disk.All = int64(lpTotalNumberOfBytes)
	// disk.Free = int64(lpTotalNumberOfFreeBytes)
	// disk.Used = disk.All - disk.Free
	return disk
}
