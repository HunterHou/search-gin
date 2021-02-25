package main

import (
	"fmt"
	"net"
	"testing"
)

// TestScan5 ..
func TestScan5(test testing.T) {

	addresses, err := net.InterfaceAddrs()
	if err != nil {
		fmt.Println(err)
	}
	for _, addr := range addresses {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				fmt.Println("ip:", ipnet.IP.String())
			}

		}
	}
}
