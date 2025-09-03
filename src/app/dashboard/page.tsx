import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Progress,
  Section,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes';
import {
  ActivityIcon,
  AlertCircleIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BarChart3Icon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  FlaskConicalIcon,
  PillIcon,
  TrendingUpIcon,
  UsersIcon,
  XCircleIcon,
} from 'lucide-react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Dashboard | Farmacia App',
  description: 'Painel de controle do sistema',
};

function getStats() {
  return [
    {
      title: 'Total de Usuários',
      value: '1.234',
      change: '+12,5%',
      trend: 'up',
      icon: <UsersIcon size={28} />,
      color: 'blue' as const,
    },
    {
      title: 'Laboratórios',
      value: '89',
      change: '+3,2%',
      trend: 'up',
      icon: <FlaskConicalIcon size={28} />,
      color: 'green' as const,
    },
    {
      title: 'Remédios',
      value: '5.678',
      change: '-1,8%',
      trend: 'down',
      icon: <PillIcon size={28} />,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Crescimento',
      value: '24,7%',
      change: '+4,1%',
      trend: 'up',
      icon: <TrendingUpIcon size={28} />,
      color: 'orange' as const,
    },
  ];
}

function getRecentActivities() {
  return [
    {
      id: 1,
      user: 'João Silva',
      action: 'criou um novo usuário',
      time: 'há 2 minutos',
      avatar: 'JS',
      status: 'success' as const,
    },
    {
      id: 2,
      user: 'Maria Santos',
      action: 'Atualizou laboratório',
      time: 'há 15 minutos',
      avatar: 'MS',
      status: 'info' as const,
    },
    {
      id: 3,
      user: 'Pedro Costa',
      action: 'cadastrou novo remédio',
      time: 'há 1 hora',
      avatar: 'PC',
      status: 'success' as const,
    },
    {
      id: 4,
      user: 'Ana Oliveira',
      action: 'removeu usuário inativo',
      time: 'há 2 horas',
      avatar: 'AO',
      status: 'warning' as const,
    },
  ];
}

function getSystemStatus() {
  return [
    {
      name: 'API Status',
      status: 'online',
      color: 'green' as const,
    },
    {
      name: 'Database',
      status: 'conectado',
      color: 'green' as const,
    },
    {
      name: 'Backup',
      status: 'pendente',
      color: 'yellow' as const,
    },
    {
      name: 'Monitoramento',
      status: 'ativo',
      color: 'blue' as const,
    },
  ];
}

export default function Dashboard() {
  const stats = getStats();
  const recentActivities = getRecentActivities();
  const systemStatus = getSystemStatus();

  return (
    <ProtectedRoute>
      <MainLayout>
        <Flex direction={'column'} px={{ initial: '0', sm: '3', md: '9' }}>
          <Box>
            <Heading size={'6'}>Dashboard</Heading>
            <Text size={'3'} color="gray">
              Visão geral do sistema e métricas importantes
            </Text>
          </Box>

          <Section size={'1'}>
            <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap={'4'}>
              {stats.map((stat, index) => (
                <Box key={index}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <Flex direction={'column'} gap={'3'}>
                      <Flex align={'center'} justify={'between'}>
                        <Box className="p-2">
                          <Box style={{ color: `var(--${stat.color}-11)` }}>
                            {stat.icon}
                          </Box>
                        </Box>
                        <Flex align={'center'} gap={'1'}>
                          {stat.trend === 'up' ? (
                            <ArrowUpRightIcon
                              size={20}
                              className="text-green-600"
                            />
                          ) : (
                            <ArrowDownRightIcon
                              size={20}
                              className="text-red-600"
                            />
                          )}
                          <Text>{stat.change}</Text>
                        </Flex>
                      </Flex>

                      <Flex gap={'1'} align={'end'} px={'1'}>
                        <Text size={'4'} weight={'bold'}>
                          {stat.value}
                        </Text>
                        <Text size={'3'} color="gray">
                          {stat.title}
                        </Text>
                      </Flex>
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Grid>
          </Section>

          <Section size={'1'}>
            <Grid
              columns={{ initial: '1', md: '3' }}
              gap={'6'}
              className="gridSystemInfo"
            >
              <Card>
                <Flex direction={'column'} gap={'4'}>
                  <Flex align={'center'} justify={'between'}>
                    <Heading size={'4'}>Performance do Sistema</Heading>
                    <Button variant="ghost" size={'1'} className="m-0">
                      <BarChart3Icon /> Ver detalhes
                    </Button>
                  </Flex>

                  <Flex direction={'column'} gap={'4'}>
                    <Box>
                      <Flex justify={'between'} mb={'2'}>
                        <Text size={'2'} weight={'medium'}>
                          Uso de CPU
                        </Text>
                        <Text size={'2'} color="gray">
                          68%
                        </Text>
                      </Flex>
                      <Progress value={68} />
                    </Box>

                    <Box>
                      <Flex justify={'between'} mb={'2'}>
                        <Text size={'2'} weight={'medium'}>
                          Memória
                        </Text>
                        <Text size={'2'} color="gray">
                          45%
                        </Text>
                      </Flex>
                      <Progress value={45} />
                    </Box>

                    <Box>
                      <Flex justify={'between'} mb={'2'}>
                        <Text size={'2'} weight={'medium'}>
                          Armazenamento
                        </Text>
                        <Text size={'2'} color="gray">
                          54%
                        </Text>
                      </Flex>
                      <Progress value={54} />
                    </Box>

                    <Box>
                      <Flex justify={'between'} mb={'2'}>
                        <Text size={'2'} weight={'medium'}>
                          Network
                        </Text>
                        <Text size={'2'} color="gray">
                          23%
                        </Text>
                      </Flex>
                      <Progress value={23} />
                    </Box>
                  </Flex>
                </Flex>
              </Card>

              <Card>
                <Flex direction={'column'} gap={'4'}>
                  <Flex align={'center'} gap={'2'}>
                    <ActivityIcon size={18} />
                    <Heading size={'4'}>Status do Sistema</Heading>
                  </Flex>

                  <Flex direction={'column'} gap={'3'}>
                    {systemStatus.map((item, index) => (
                      <Flex key={index} align={'center'} justify={'between'}>
                        <Text size={'2'} weight={'medium'} wrap={'nowrap'}>
                          {item.name}
                        </Text>
                        <Separator size={'4'} mx={'2'} />
                        <Badge color={item.color} variant="soft">
                          {item.status}
                        </Badge>
                      </Flex>
                    ))}
                  </Flex>

                  <Box>
                    <Flex gap={'2'} align={'center'}>
                      <Text size={'1'} color="gray">
                        Ultima verificação: há 2 minutos
                      </Text>

                      <Button size={'1'} variant="outline">
                        Verificar
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </Card>
            </Grid>
          </Section>

          <Section size={'1'}>
            <Card>
              <Flex direction={'column'} gap={'4'}>
                <Flex align={'center'} gap={'2'}>
                  <ClockIcon size={18} />
                  <Heading>Atividades Recentes</Heading>
                </Flex>
                <Button variant="ghost" size={'2'} className="m-0 mb-2">
                  Ver todas
                </Button>
              </Flex>

              <Flex direction={'column'} gap={'3'}>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <Card>
                      <Flex align={'center'} gap={'3'}>
                        <Avatar
                          fallback={activity.avatar}
                          size={'2'}
                          radius="full"
                        />

                        <Flex direction={'column'} gap={'1'} className="grow">
                          <Text size={'2'}>
                            <Strong>{activity.user}</Strong> {activity.action}
                          </Text>

                          <Text size={'1'}>{activity.time}</Text>
                        </Flex>

                        <Box>
                          {activity.status === 'success' && (
                            <CheckCircleIcon
                              size={16}
                              className="text-green-500"
                            />
                          )}

                          {activity.status === 'info' && (
                            <AlertCircleIcon
                              size={16}
                              className="text-blue-500"
                            />
                          )}

                          {activity.status === 'warning' && (
                            <XCircleIcon
                              size={16}
                              className="text-orange-500"
                            />
                          )}
                        </Box>
                      </Flex>
                    </Card>
                  </Box>
                ))}
              </Flex>
            </Card>
          </Section>

          <Section size={'1'}>
            <Card>
              <Flex direction={'column'} gap={'4'}>
                <Heading size={'4'}>Ações Rápidas</Heading>

                <Grid columns={{ initial: '2', sm: '4' }} gap={'3'}>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                  >
                    <UsersIcon size={20} />
                    <Text>Novo Usuário</Text>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                  >
                    <FlaskConicalIcon size={20} />
                    <Text>Novo Laboratório</Text>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                  >
                    <PillIcon size={20} />
                    <Text>Novo Remédio</Text>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                  >
                    <CalendarIcon size={20} />
                    <Text>Novo Agendamento</Text>
                  </Button>
                </Grid>
              </Flex>
            </Card>
          </Section>
        </Flex>
      </MainLayout>
    </ProtectedRoute>
  );
}
