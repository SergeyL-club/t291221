export interface adminObj {
  name: string;
  email: string;
  password: string;
}

const port = 1337;
const dbName = "RestApiDef";
const mongoAdr = "localhost";
const mongoPort = "27017";
const dbUrl = `mongodb://${mongoAdr}:${mongoPort}/${dbName}`;
const saltWorkFactor = 10;
const accessTokenTtl = "15m";
const refreshTokenTtl = "1y";
const adminObj: adminObj = {
  name: "admin",
  email: "admin@mail.ru",
  password: "admin132132",
};

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxUZVplo9pTad0TS/wUQ6
t6QB0zEizLkU5s5bJ+U2/IksmBjDjSoE9kwZnXRwfGQ4FDUiEpNKodY03v44UEvg
9Su8qy+vjk8m/C8WfdPp7KerN53z5cQMPmKj128a+lVjeXA0W3aGgII3XbZgMin1
9XWxBHxC92qJjNJqEteawecQ45w1RoxLKTi/PAGAY7tcMLqoO2yuscDZTeM/uFiQ
KR+LnMx2sg/mDb2RKLN4SdyYpSDQsGBUhRV3B5Mb4tL/YIGygJg8EWu92N4ld1uE
l4dXnoOhE92sbeOtZJLltVFw1ukrbGVqvWOPDIV5ZI+QhY0g+CwQSaAma/oXZXoD
ao7oXuDusSd18lnl/znMtbXLI2rm2ZtZC7VQ+OfxB78HM6o31Sd6c7JwKYkwUPqY
snQdzWZKZ7f5Tc+tUMREJlWPX0vzKhNXx/le2L5BoDUH5Xu/oZQCeKa4rb3DT+4d
pW71nqKvK5ySHk9fnnzi9PclyzQAglbeK289O0oj7S9qCmX0h8/7Zz6OrOsA8ezO
YS8AZ8+TB8YPHzXbF2/+i8TTkXqIwTVsi0sQNw+nCdV5vzKXYbPYhYNQbR0l/G3/
iI8ehWrWb+yDgcbYf55fsOhK46M2mt05v7PvGscncrXeVSsO/TpKIIkfOkLacpdT
7xcIQrnt+ly9CMMobnwisoECAwEAAQ==
-----END PUBLIC KEY-----`;
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIJKQIBAAKCAgEAxUZVplo9pTad0TS/wUQ6t6QB0zEizLkU5s5bJ+U2/IksmBjD
jSoE9kwZnXRwfGQ4FDUiEpNKodY03v44UEvg9Su8qy+vjk8m/C8WfdPp7KerN53z
5cQMPmKj128a+lVjeXA0W3aGgII3XbZgMin19XWxBHxC92qJjNJqEteawecQ45w1
RoxLKTi/PAGAY7tcMLqoO2yuscDZTeM/uFiQKR+LnMx2sg/mDb2RKLN4SdyYpSDQ
sGBUhRV3B5Mb4tL/YIGygJg8EWu92N4ld1uEl4dXnoOhE92sbeOtZJLltVFw1ukr
bGVqvWOPDIV5ZI+QhY0g+CwQSaAma/oXZXoDao7oXuDusSd18lnl/znMtbXLI2rm
2ZtZC7VQ+OfxB78HM6o31Sd6c7JwKYkwUPqYsnQdzWZKZ7f5Tc+tUMREJlWPX0vz
KhNXx/le2L5BoDUH5Xu/oZQCeKa4rb3DT+4dpW71nqKvK5ySHk9fnnzi9PclyzQA
glbeK289O0oj7S9qCmX0h8/7Zz6OrOsA8ezOYS8AZ8+TB8YPHzXbF2/+i8TTkXqI
wTVsi0sQNw+nCdV5vzKXYbPYhYNQbR0l/G3/iI8ehWrWb+yDgcbYf55fsOhK46M2
mt05v7PvGscncrXeVSsO/TpKIIkfOkLacpdT7xcIQrnt+ly9CMMobnwisoECAwEA
AQKCAgEApraBu0uXvP8i76F8S3+1f2wCfs+PcSMYHtVVA6oZheEG5qJG4A0alGpL
W10Dkpu/KJSebsQ61fmIRMriHDmDqq2Di8eIvOL3Nzcz8rIbhftMHnxFmW7MSgxi
GbWzPsrafc3s8T6A/CkPUQrG0J3VVdJX/kpk7WIDTBalvbam+iajhzaDb1MwUW27
bqJ2NdIoXqXfdhiqqV0oR0I8nzV43sfh3GiOBnyZFhOVkKfah9D8zs+kjOlbg/xX
0vbnIhDd8Fiq2THN0YsTrSpOz0dwDf46daMXhQpYpaU66zuZFFn22ifCoqAyTErO
oO5LYEhTAgn6SsAyI4ZL8gQvsXojV3XvWbFOSeAK0lQj7EQNT43MxScHMT1os38B
RX6lQ/izZZRzF8AXek2x5ddmxAX006XDpZb4tr7v5ferVy+pZsELrB9OloN7opJE
Z4TdBs4h4RMhJqXxP3Vz00xeSjQBTT2m7yq0vyJplC7rKgwcHX0/CMc4dBN6YdqX
upus0C7lp6WbUCmLG6ceygGe9WvNKZJA4X/+KizA7hJIslIBWTKCcaqr6msd1B6O
BEDnN1aAininMQIiC7lqNF8uA2SxA1WaXnlwjqttgWNWs/Pzgpw/b2VgX2Be46Ux
h3o7YT9KpqVp3SI/kzP6esZeKVKE/bHWVqqa5b9dehY+7GpXT2ECggEBAOX0VvJM
MGOXvjip0gdXZkQIYch3tLcwn3TzwIMHqjcNOfpe/lo4N0W2pP51R/ss/sncmkqi
6FE5ixsTKj3VibhelMT4BjcBxXd2Taqhq7k/tnFyvdxerFCgM0BjJtkka+xHpEYG
2Vgg/UEM13R2uJaViU4XmJ+Wk4gDIT2DArNEhTWXpAhoayLrMP1hYWNvhPMd6rof
eMA7SPCyV3u3sxgoPDYCTZ3mLSPGCGcrNnYwW5l+NIHhipqiZGga3T9Oj9YbXT3U
aGJCS0/po618AgMe0lq1Vao+d1y0l4ES2EzBHQVXYDoDFQZ4jW27x+4mhNf8mVTN
ZJNyc4jadn2B+ZcCggEBANuebZ6AzRiGvT/vXvhIxZy/FPc99j2P6637gMxAu5N6
xz/WRKY2nSK/trcev966Yk0SqmM3BUOWzZQ9fQpLKDIEPtjNHMBVY+F2+Zk+NGd6
T7SvgIvIwFyDv6zPsXveHSctH6pUoZbmZLlGysVjzCRhC59GmbbE40dc6UJlxR6s
+mULB8Yd7MBwaXllee4fyaL39KFXaIPVtbbo53itvevimJ5ITf1THprMvUBDW96H
eI8kvjeuqSJWoLfXv0kSx1z79t3EpSjfMsNK5rB50j9aPIaEuWsMbAF9PKDGV1tX
GYdyv4ULX7rxTYkpiidkSieVLma1ylvbpEK7HbTgR6cCggEAU5/k0p6EZmNziLWx
LHxLM2h87uMhdBEZm/VcyAnMi9Kih/ttsi+JYi/Glsbd02kMiypPbd8KbydnAASb
Mvtp5wN2RJ8R24UoY4ZBPlEm2uphlaYth2tibLulh7/HC+Zj3Pw8sD6jYZo1nydl
XvQhsplU4nJQTZD7u9Wvi+gN3lWHv/KSc4BNndg765kzSm7uwV7a0q7JQdcNcoLY
r6QhXCKdquJxiX+AYOcOfT5IwvhZB1vPCoCT4CI4M2e5l+EhC7LN2MNa5ojHTJth
q6BSNwJJazVQnuWykKMYCZdp05fSzvN0igQ+7CiA/ivwzBlz6/vvYtiCv+A6RcV0
m7XdpwKCAQEAugEaco5AJq+nhYjk9IAd7j3gMe7mqQlF4NsMIPIKbEQmkSiWh/fl
alLZG4sNkkRlkUVnzhQBf1cv0oepaZhx+Lqjx9cgrL0llQXBLEsE80ciTrP9uWZT
lYd4RZK6jWB3bIDJOufm2/lSAaG1hyyY747J2yJeee+TVxOX88ZiBzMV95I6CU+6
/tm2WzzY4hdGHaLILAXt3QqZlsr3kLwGCMyn2hb/BrjpSM5y0wS5wGUYdJP4Dwz8
7rpT8KDnv6oJ8/TrBrTP9SfkxIahj4H90e5JKN0sdT/WEgTR3pFd11yToKZNEw+p
Cpnow2zNN8O3EoNFA3SgaOBD5Mi5xkHWLQKCAQACvQGnzWErZPVfc3PWa/gdorYV
KLmLAHcCn84xAn+5xOJxINRsCRN0QoTsAulW3goW3j2hst+Y3KlzKAHVardm7Ir9
IW2GCLlsDMJ9//GLp3EbZIDW79z36CmvOSOZl0VYUxGT6+2DpchVDCa1CsjkWhXE
/uweCCbHWufFQawaSRkeEvcfZLhSUEK9+gK1AbNcfutChbRmFIbGCPw+uY+6fMqA
v2KkFlOfVCcFOWGe2sESfTUOgzzFfCtid0F7KLVFSGDxp5lsNJ+DJweWla8oLH5d
EorkJ9uNEm9zUBITZHZs1A5Ybvr/XQ2xxZ68x7xdVfDhxQq4aQ+vhB5TYfOr
-----END RSA PRIVATE KEY-----`;

export enum ConfigParam {
  port = "port",
  dbName = "dbName",
  dbUrl = "dbUrl",
  saltWorkFactor = "saltWorkFactor",
  publicKey = "publicKey",
  privateKey = "privateKey",
  accessTokenTtl = "accessTokenTtl",
  refreshTokenTtl = "refreshTokenTtl",
  adminObj = "adminObj",
}

export default {
  port,
  dbName,
  dbUrl,
  saltWorkFactor,
  publicKey,
  privateKey,
  accessTokenTtl,
  refreshTokenTtl,
  adminObj,
};
